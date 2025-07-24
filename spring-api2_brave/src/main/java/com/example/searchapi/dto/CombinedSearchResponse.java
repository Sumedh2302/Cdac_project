package com.example.searchapi.dto;

import java.util.List;

import com.example.searchapi.model.SearchResult;

public class CombinedSearchResponse {
	
	 private String instantAnswer;
	    private List<SearchResult> searchResults;

	    public CombinedSearchResponse() {}

	    public CombinedSearchResponse(String instantAnswer, List<SearchResult> searchResults) {
	        this.instantAnswer = instantAnswer;
	        this.searchResults = searchResults;
	    }

	    public String getInstantAnswer() { 
	    	return instantAnswer; 
	    	}
	    
	    public void setInstantAnswer(String instantAnswer) { 
	    	this.instantAnswer = instantAnswer;
	    }
	    public List<SearchResult> getSearchResults() { 
	    	return searchResults; 
	    }
	    public void setSearchResults(List<SearchResult> searchResults) { 
	    	this.searchResults = searchResults; 
	    }

}
