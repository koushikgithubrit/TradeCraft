import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { modules } from '../data/modules';
import { pdfService } from '../services/pdfService';
import { progressService } from '../services/progressService';
import type { PDFContent } from '../services/pdfService';
import type { Module, Lesson } from '../data/modules';
import { useAuth } from '../context/AuthContext';

export default function TradingCourse() {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [pdfContent, setPdfContent] = useState<PDFContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPage, setSelectedPage] = useState(0); // 0-based index
  const { user } = useAuth();

  // Progress tracking using localStorage (per user)
  const getUserProgress = () => {
    const key = user?.id ? `userProgress_${user.id}` : 'userProgress_guest';
    try {
      return JSON.parse(localStorage.getItem(key) || '{}');
    } catch {
      return {};
    }
  };
  const setUserProgress = (progress: any) => {
    const key = user?.id ? `userProgress_${user.id}` : 'userProgress_guest';
    localStorage.setItem(key, JSON.stringify(progress));
  };

  // Calculate progress
  const totalModules = modules.length;
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const totalPages = modules.reduce((sum, m) => sum + m.lessons.reduce((s, l) => s + (getUserProgress()[l.id]?.totalPages || 0), 0), 0);
  const readPages = modules.reduce((sum, m) => sum + m.lessons.reduce((s, l) => s + (getUserProgress()[l.id]?.readPages?.length || 0), 0), 0);

  useEffect(() => {
    // Set current module and lesson
    if (moduleId) {
      const module = modules.find(m => m.id === moduleId);
      if (module) {
        setCurrentModule(module);
        if (lessonId) {
          const lesson = module.lessons.find(l => l.id === lessonId);
          if (lesson) {
            setCurrentLesson(lesson);
          } else {
            setCurrentLesson(module.lessons[0]);
          }
        } else {
          setCurrentLesson(module.lessons[0]);
        }
      } else {
        setCurrentModule(modules[0]);
        setCurrentLesson(modules[0].lessons[0]);
      }
    } else {
      setCurrentModule(modules[0]);
      setCurrentLesson(modules[0].lessons[0]);
    }
  }, [moduleId, lessonId]);

  useEffect(() => {
    // Load PDF content for the lesson
    const loadPdfContent = async () => {
      if (currentLesson) {
        setIsLoading(true);
        setError(null);
        try {
          const content = await pdfService.parsePDF(currentLesson.pdfPath);
          setPdfContent(content);
          setSelectedPage(0);
          // Update user progress with total pages
          const progress = getUserProgress();
          if (!progress[currentLesson.id]) {
            progress[currentLesson.id] = { readPages: [], totalPages: content.sections.length };
          } else {
            progress[currentLesson.id].totalPages = content.sections.length;
          }
          setUserProgress(progress);
        } catch (err) {
          setError('Failed to load lesson content. Please try again later.');
          setPdfContent(null);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadPdfContent();
  }, [currentLesson]);

  const markPageAsRead = (pageIdx: number) => {
    if (currentLesson && pdfContent) {
      const progress = getUserProgress();
      if (!progress[currentLesson.id]) {
        progress[currentLesson.id] = { readPages: [], totalPages: pdfContent.sections.length };
      }
      if (!progress[currentLesson.id].readPages) progress[currentLesson.id].readPages = [];
      if (!progress[currentLesson.id].readPages.includes(pageIdx)) {
        progress[currentLesson.id].readPages.push(pageIdx);
        setUserProgress(progress);
      }
    }
  };

  const handleLessonClick = (lessonId: string) => {
    if (currentModule) {
      navigate(`/trading-course/${currentModule.id}/${lessonId}`);
    }
  };

  const handleModuleClick = (moduleId: string) => {
    navigate(`/trading-course/${moduleId}`);
  };

  const handleNextPage = () => {
    if (pdfContent && selectedPage < pdfContent.sections.length - 1) {
      const nextPage = selectedPage + 1;
      setSelectedPage(nextPage);
      markPageAsRead(nextPage);
    }
  };
  const handlePrevPage = () => {
    if (pdfContent && selectedPage > 0) {
      const prevPage = selectedPage - 1;
      setSelectedPage(prevPage);
      markPageAsRead(prevPage);
    }
  };

  const handlePageClick = (idx: number) => {
    setSelectedPage(idx);
    markPageAsRead(idx);
  };

  // UI
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'w-72' : 'w-0'} bg-white border-r border-gray-200 shadow-lg h-screen overflow-y-auto z-20`}>
        <div className={`flex items-center justify-between px-4 py-3 border-b border-gray-100 ${sidebarOpen ? '' : 'hidden'}`}>
          <span className="font-bold text-lg">Modules</span>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-700">✕</button>
        </div>
        {sidebarOpen && (
          <div className="p-4">
            {modules.map((module) => (
              <div key={module.id} className="mb-6">
                <button
                  onClick={() => handleModuleClick(module.id)}
                  className={`w-full text-left font-semibold py-2 px-2 rounded-md mb-1 ${currentModule?.id === module.id ? 'bg-emerald-100 text-emerald-700' : 'hover:bg-gray-100'}`}
                >
                  {module.title}
                </button>
                {currentModule?.id === module.id && (
                  <div className="pl-2">
                    {module.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonClick(lesson.id)}
                        className={`block w-full text-left py-1 px-3 rounded-md mb-1 text-sm ${currentLesson?.id === lesson.id ? 'bg-emerald-500 text-white' : 'hover:bg-emerald-50'}`}
                      >
                        {lesson.title}
                        {getUserProgress()[lesson.id]?.readPages?.length === getUserProgress()[lesson.id]?.totalPages && getUserProgress()[lesson.id]?.totalPages > 0 && (
                          <span className="ml-2 text-emerald-400">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Sidebar Toggle Button */}
      {!sidebarOpen && (
        <button
          className="fixed top-4 left-4 z-30 bg-white border border-gray-200 shadow px-3 py-2 rounded-md"
          onClick={() => setSidebarOpen(true)}
        >
          ☰ Modules
        </button>
      )}
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 mt-0">
          <div
            className="bg-emerald-500 h-2 transition-all"
            style={{ width: `${totalPages > 0 ? (readPages / totalPages) * 100 : 0}%` }}
          ></div>
        </div>
        <div className="flex flex-1">
          {/* Page List */}
          <div className="w-56 bg-white border-r border-gray-200 p-4 overflow-y-auto">
            <div className="font-semibold mb-2">Pages</div>
            {pdfContent && pdfContent.sections.map((section, idx) => (
              <button
                key={section.title + idx}
                onClick={() => handlePageClick(idx)}
                className={`block w-full text-left px-3 py-2 rounded-md mb-1 text-sm transition-colors ${selectedPage === idx ? 'bg-emerald-500 text-white' : 'hover:bg-emerald-100'} ${getUserProgress()[currentLesson?.id || '']?.readPages?.includes(idx) ? 'font-bold' : ''}`}
              >
                Page {idx + 1}
                {getUserProgress()[currentLesson?.id || '']?.readPages?.includes(idx) && (
                  <span className="ml-2 text-emerald-400">✓</span>
                )}
              </button>
            ))}
          </div>
          {/* Page Content */}
          <div className="flex-1 p-8 flex flex-col items-center justify-start bg-gray-50 min-h-screen">
            {isLoading ? (
              <div className="flex items-center justify-center h-full w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 font-semibold">{error}</div>
            ) : pdfContent ? (
              <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold mb-1">{currentLesson?.title}</h1>
                    <p className="text-gray-500 text-sm mb-2">{currentLesson?.description}</p>
                  </div>
                  <div className="text-sm text-gray-400">Page {selectedPage + 1} of {pdfContent.sections.length}</div>
                </div>
                {/* Page Content */}
                <div className="prose max-w-none mb-6">
                  <h2 className="text-xl font-bold mb-2">{pdfContent.sections[selectedPage]?.title}</h2>
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {pdfContent.sections[selectedPage]?.blocks.map((block, idx) => {
                      if (block.type === 'text') {
                        return (
                          <p key={idx} className="mb-4">{block.text}</p>
                        );
                      } else if (block.type === 'image') {
                        return (
                          <img
                            key={idx}
                            src={block.dataUrl}
                            alt={`PDF page visual content ${idx + 1}`}
                            className="my-4 rounded-lg"
                            style={{ maxWidth: '100%' }}
                          />
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
                {/* Navigation */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={handlePrevPage}
                    disabled={selectedPage === 0}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={selectedPage === pdfContent.sections.length - 1}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-md disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {/* Progress Stats */}
        <div className="w-full bg-white border-t border-gray-200 py-2 px-6 flex items-center justify-between text-sm text-gray-600">
          <div>Modules: {totalModules} | Lessons: {totalLessons} | Pages: {totalPages}</div>
          <div>Progress: {readPages} / {totalPages} pages read ({totalPages > 0 ? Math.round((readPages / totalPages) * 100) : 0}%)</div>
        </div>
      </div>
    </div>
  );
} 