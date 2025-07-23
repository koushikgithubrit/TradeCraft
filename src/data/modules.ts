export interface Lesson {
  id: string;
  title: string;
  description: string;
  pdfPath: string;
  duration: string;
  isCompleted?: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  isCompleted?: boolean;
}

// List of all available PDFs in public/pdfjs/pdfs
const availablePDFs = [
  'single-candlesticks.pdf',
  'double-candlesticks.pdf',
  'triple-candlesticks.pdf',
  'bullish-patterns.pdf',
  'candlestick-bible.pdf',
  'price-action-1.pdf',
  'price-action-2.pdf',
  'price-action-breakdown.pdf',
  'technical-analysis.pdf',
  'chart-patterns.pdf',
  'support-resistance.pdf',
  'trading-psychology.pdf',
  'mental-fitness.pdf',
  'day-trading.pdf',
  'high-probability.pdf',
  'one-hour-trade.pdf',
  'The Market English.pdf',
  'The Int INV.pdf',
  'Share Market Mein Munafe Ke Mantra LifeFeeling.pdf',
  'Scan_compressed.pdf',
  'Candlelstick Patten English.pdf',
  '1-1.pdf',
  "How_to_Day_Trade_for_a_Living_A_Beginner's_Guide_to_Trading_Tools.pdf",
];

// Distribute PDFs across lessons, one per lesson, no duplicates
const allLessonDefs = [
  { id: 'single-candlesticks', title: 'Single Candlestick Patterns', description: 'Learn about single candlestick patterns and their significance in trading.', duration: '45 minutes' },
  { id: 'double-candlesticks', title: 'Double Candlestick Patterns', description: 'Understand double candlestick patterns and their trading implications.', duration: '60 minutes' },
  { id: 'triple-candlesticks', title: 'Triple Candlestick Patterns', description: 'Explore triple candlestick patterns for advanced trading strategies.', duration: '75 minutes' },
  { id: 'bullish-patterns', title: 'Bullish Candlestick Patterns', description: 'Study bullish candlestick patterns for identifying potential uptrends.', duration: '90 minutes' },
  { id: 'candlestick-bible', title: 'Candlestick Trading Bible', description: 'Comprehensive guide to candlestick trading strategies.', duration: '120 minutes' },
  { id: 'price-action-1', title: 'Price Action Fundamentals', description: 'Understanding the basics of price action trading.', duration: '90 minutes' },
  { id: 'price-action-2', title: 'Advanced Price Action', description: 'Advanced concepts in price action trading.', duration: '120 minutes' },
  { id: 'price-action-breakdown', title: 'Price Action Breakdown', description: 'Detailed breakdown of price action trading approaches.', duration: '100 minutes' },
  { id: 'technical-analysis-basics', title: 'Technical Analysis Basics', description: 'Introduction to technical analysis and its importance.', duration: '60 minutes' },
  { id: 'chart-patterns', title: 'Chart Patterns', description: 'Learn to identify and trade chart patterns.', duration: '90 minutes' },
  { id: 'support-resistance', title: 'Support and Resistance', description: 'Understanding support and resistance levels in trading.', duration: '75 minutes' },
  { id: 'trading-psychology-playbook', title: 'Trading Psychology Playbook', description: 'Comprehensive guide to trading psychology.', duration: '90 minutes' },
  { id: 'mental-fitness', title: 'Mental Fitness for Traders', description: 'Building mental resilience for trading success.', duration: '60 minutes' },
  { id: 'day-trading', title: 'Day Trading Guide', description: 'Complete guide to day trading for beginners.', duration: '120 minutes' },
  { id: 'high-probability', title: 'High Probability Trading', description: 'Strategies for high probability trading setups.', duration: '90 minutes' },
  { id: 'one-hour-trade', title: 'One Hour Trade Strategy', description: 'Simple and effective one-hour trading strategy.', duration: '60 minutes' },
];

// Assign PDFs to lessons in order
const lessons: Lesson[] = availablePDFs.slice(0, allLessonDefs.length).map((pdf, i) => ({
  ...allLessonDefs[i],
  pdfPath: '/pdfjs/pdfs/' + pdf,
}));

// If there are more PDFs than lesson definitions, add them as extra lessons
const extraLessons: Lesson[] = availablePDFs.slice(allLessonDefs.length).map((pdf, i) => ({
  id: `extra-${i + 1}`,
  title: pdf.replace('.pdf', ''),
  description: `Lesson for ${pdf}`,
  pdfPath: '/pdfjs/pdfs/' + pdf,
  duration: '60 minutes',
}));

// Distribute lessons into modules (same as before, but now each lesson has a unique PDF)
export const modules: Module[] = [
  {
    id: 'candlestick-patterns',
    title: 'Candlestick Patterns',
    description: 'Master the art of reading candlestick patterns for better trading decisions.',
    lessons: lessons.slice(0, 5),
  },
  {
    id: 'price-action',
    title: 'Price Action Trading',
    description: 'Learn to trade based on price action and market structure.',
    lessons: lessons.slice(5, 8),
  },
  {
    id: 'technical-analysis',
    title: 'Technical Analysis',
    description: 'Master technical analysis tools and indicators.',
    lessons: lessons.slice(8, 11),
  },
  {
    id: 'trading-psychology',
    title: 'Trading Psychology',
    description: 'Develop the mental discipline required for successful trading.',
    lessons: lessons.slice(11, 13),
  },
  {
    id: 'trading-strategies',
    title: 'Trading Strategies',
    description: 'Learn proven trading strategies for different market conditions.',
    lessons: lessons.slice(13, 16),
  },
];

// Add extra lessons as a new module if any
if (extraLessons.length > 0) {
  modules.push({
    id: 'all-pdfs',
    title: 'All PDFs',
    description: 'Showcase all remaining PDF files as lessons.',
    lessons: extraLessons,
  });
} 