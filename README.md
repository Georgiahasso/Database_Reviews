# Review Performance Dashboard

A comprehensive, data-driven dashboard for analyzing customer review performance with Supabase integration. This dashboard provides insights into review ratings, customer engagement, and marketing opportunities.

## 🚀 Features

- **Real-time Data**: Connects to Supabase for live review data
- **Interactive Charts**: Beautiful visualizations using Recharts
- **Responsive Design**: Works on desktop and mobile devices
- **Time Range Filtering**: Analyze data for different periods (30, 60, 90 days)
- **KPI Metrics**: Key performance indicators for review management
- **Marketing Tools**: Identify high-quality reviews for advertising campaigns
- **Developer Replies**: Track customer engagement and response rates

## 📊 Dashboard Sections

### Chapter 1: Overall Performance

- Average rating across all reviews
- Reply rate percentage
- Helpful review metrics
- Total review volume

### Chapter 2: Rating Analysis

- Rating distribution bar chart
- Rating trend over time

### Chapter 3: Customer Engagement

- Review volume trends
- Developer reply rates

### Chapter 4: Marketing Opportunities

- High-quality reviews suitable for advertising
- Easy-to-use marketing tools

### Chapter 5: Most Helpful Reviews

- Top-rated reviews by helpfulness
- Developer response tracking

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account and project

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Create the following tables in your Supabase database:

#### Reviews Table

```sql
CREATE TABLE reviews (
  id BIGSERIAL PRIMARY KEY,
  posted_at DATE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  body TEXT NOT NULL,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Review Replies Table

```sql
CREATE TABLE review_replies (
  id BIGSERIAL PRIMARY KEY,
  review_id BIGINT REFERENCES reviews(id) ON DELETE CASCADE,
  reply_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

3. Enable Row Level Security (RLS) and create policies if needed
4. Get your project URL and anon key from the Supabase dashboard

### 3. Environment Configuration

1. Copy the example environment file:

```bash
cp env.example .env.local
```

2. Update `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Optional: Custom table names (defaults will be used if not specified)
NEXT_PUBLIC_REVIEWS_TABLE=reviews
NEXT_PUBLIC_REPLIES_TABLE=review_replies
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 📁 Project Structure

```
├── components/           # Reusable UI components
│   ├── charts/          # Chart components
│   ├── KPICard.tsx      # KPI display component
│   ├── StarRating.tsx   # Star rating component
│   └── ...
├── hooks/               # Custom React hooks
│   └── useReviewMetrics.ts
├── lib/                 # Utility libraries
│   └── supabase.ts      # Supabase configuration and queries
├── pages/               # Next.js pages
│   ├── index.tsx        # Main dashboard page
│   └── _app.tsx         # App wrapper
├── styles/              # Global styles
│   └── globals.css      # Tailwind CSS and custom styles
└── ...
```

## 🔧 Customization

### Adding New Metrics

1. Update the `Review` interface in `lib/supabase.ts`
2. Add new calculations to `hooks/useReviewMetrics.ts`
3. Create new chart components in `components/charts/`
4. Update the main dashboard in `pages/index.tsx`

### Styling

The dashboard uses Tailwind CSS for styling. Customize colors and themes in `tailwind.config.js`.

### Data Sources

The dashboard is designed to work with Supabase, but you can easily adapt it to work with other data sources by modifying the `ReviewService` class in `lib/supabase.ts`.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Other Platforms

The dashboard can be deployed to any platform that supports Next.js applications (Netlify, Railway, etc.).

## 📝 API Reference

### ReviewService Methods

- `getReviews(timeRangeDays: number)`: Fetch reviews within a time range
- `getAllReviews()`: Fetch all reviews
- `addReview(review: Review)`: Add a new review
- `addReply(reviewId: number, replyText: string)`: Add a reply to a review

### Custom Hooks

- `useReviewMetrics(reviews, timeRange)`: Calculate KPI metrics
- `useRatingDistribution(reviews)`: Get rating distribution data
- `useRatingTrend(reviews)`: Get rating trend over time
- `useVolumeTrend(reviews)`: Get review volume trends
- `useAdReadyReviews(reviews)`: Get marketing-ready reviews
- `useTopHelpfulReviews(reviews)`: Get most helpful reviews

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. Check the Supabase connection and credentials
2. Verify your database schema matches the expected structure
3. Check the browser console for any error messages
4. Ensure all dependencies are properly installed

For additional help, please open an issue on GitHub.
