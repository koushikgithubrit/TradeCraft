import { motion } from 'framer-motion';

interface LessonContentProps {
  title: string;
  content: string;
  onComplete: () => void;
  isCompleted: boolean;
}

export default function LessonContent({ title, content, onComplete, isCompleted }: LessonContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20"
    >
      <h2 className="text-2xl font-semibold text-white mb-6">{title}</h2>
      
      <div className="prose prose-invert max-w-none">
        <div className="text-gray-300 space-y-4">
          {content}
        </div>
      </div>

      {!isCompleted && (
        <div className="mt-8 flex justify-end">
          <button
            onClick={onComplete}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors duration-200"
          >
            Mark as Completed
          </button>
        </div>
      )}
    </motion.div>
  );
} 