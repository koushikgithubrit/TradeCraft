import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface ModuleContent {
  pageNumber: number;
  content: string;
  images: string[];
}

const ModuleViewer: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [moduleContent, setModuleContent] = useState<ModuleContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This will be replaced with actual PDF content loading logic
    const loadModuleContent = async () => {
      try {
        // TODO: Implement PDF content loading from your PDF files
        setLoading(false);
      } catch (error) {
        console.error('Error loading module content:', error);
        setLoading(false);
      }
    };

    loadModuleContent();
  }, [moduleId, currentPage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {moduleContent ? (
          <>
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: moduleContent.content }} />
              {moduleContent.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Module content image ${index + 1}`}
                  className="my-4 rounded-lg"
                />
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
              >
                Previous Page
              </button>
              <span className="text-gray-600">Page {currentPage}</span>
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Next Page
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600">
            No content available for this module.
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleViewer; 