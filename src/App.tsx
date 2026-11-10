import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

import { ScrollManager } from '@/components/layout/ScrollManager'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/hooks/useTheme'
import { HomePage } from '@/pages/HomePage'
import { ProjectsIndexPage } from '@/pages/ProjectsIndexPage'
import { ProjectDetailPage } from '@/pages/ProjectDetailPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

/** Route tree wrapped in the subtle page transition. */
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <div key={location.pathname} className="page-enter">
      <ScrollManager />
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsIndexPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

// BASE_URL is '/' locally and '/avleen-portfolio/' on the GitHub Pages
// build (vite --base), so the same router serves both unchanged.
export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Header />
        <AnimatedRoutes />
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}
