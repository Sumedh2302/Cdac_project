import React from 'react';
import { Zap, ExternalLink } from 'lucide-react';

const InstantAnswer = ({ instantAnswer, onClose }) => {
  if (!instantAnswer) return null;

  const hasAbstract = instantAnswer.AbstractText && instantAnswer.AbstractText.trim();
  const hasAnswer = instantAnswer.Answer && instantAnswer.Answer.trim();
  const hasRelatedTopics = instantAnswer.RelatedTopics && instantAnswer.RelatedTopics.length > 0;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Instant Answer</h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}
      </div>

      {instantAnswer.Heading && (
        <h4 className="text-xl font-medium text-gray-900 mb-3">
          {instantAnswer.Heading}
        </h4>
      )}

      {hasAbstract && (
        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed">
            {instantAnswer.AbstractText}
          </p>
        </div>
      )}

      {hasAnswer && (
        <div className="mb-4 p-3 bg-white rounded border-l-4 border-green-500">
          <p className="text-gray-800 font-medium">
            {instantAnswer.Answer}
          </p>
        </div>
      )}

      {hasRelatedTopics && (
        <div className="mt-4">
          <h5 className="text-sm font-medium text-gray-700 mb-2">
            Related Topics ({instantAnswer.RelatedTopicsCount || instantAnswer.RelatedTopics.length})
          </h5>
          <div className="space-y-2">
            {instantAnswer.RelatedTopics.slice(0, 5).map((topic, index) => (
              <a
                key={index}
                href={topic.FirstURL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                <span>{topic.Text}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InstantAnswer; 