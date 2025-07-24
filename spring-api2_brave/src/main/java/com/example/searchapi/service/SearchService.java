package com.example.searchapi.service;

import com.example.searchapi.model.CachedQuery;
import com.example.searchapi.model.SearchResult;
import com.example.searchapi.model.SearchResult.ResultItem;
import com.example.searchapi.repository.CachedQueryRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SearchService {

    @Value("${brave.api.key}")
    private String braveApiKey;

    @Value("${brave.api.url}")
    private String braveApiUrl;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final CachedQueryRepository repository;

    public SearchService(CachedQueryRepository repository) {
        this.repository = repository;
    }

    public SearchResult search(String query) throws Exception {
    	String cleanedQuery = query.toLowerCase().trim();
        // 1. Check cache
        Optional<CachedQuery> cached = repository.findByQuery(cleanedQuery);
        if (cached.isPresent()) {
        	System.out.println("✅ [CACHE] Query served from MongoDB: " + cleanedQuery);
            SearchResult cachedResult = new SearchResult();
            cachedResult.setResults(cached.get().getResults());
            return cachedResult;
        }

        // 2. If not cached, call Brave API
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json");
        headers.set("X-Subscription-Token", braveApiKey);

        String url = braveApiUrl + "?q=" + query;

        HttpEntity<String> request = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, request, String.class);

        JsonNode root = objectMapper.readTree(response.getBody());
        JsonNode results = root.path("web").path("results");

        List<ResultItem> items = new ArrayList<>();

        if (results.isArray()) {
            for (JsonNode node : results) {
                ResultItem item = new ResultItem();
                item.setTitle(node.path("title").asText());
                item.setUrl(node.path("url").asText());
                item.setDescription(node.path("description").asText());
                items.add(item);
            }
        }

        // 3. Save to MongoDB
        CachedQuery cachedQuery = new CachedQuery();
        cachedQuery.setQuery(query.toLowerCase().trim());
        cachedQuery.setResults(items);
        repository.save(cachedQuery);

        // 4. Return result
        SearchResult searchResult = new SearchResult();
        searchResult.setResults(items);
        return searchResult;
    }
}
