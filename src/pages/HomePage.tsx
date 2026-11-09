import { Hero } from '@/components/home/Hero'
import { Snapshot } from '@/components/home/Snapshot'
import { FeaturedProjects } from '@/components/home/FeaturedProjects'
import { About } from '@/components/home/About'
import { Experience } from '@/components/home/Experience'
import { Expertise } from '@/components/home/Expertise'
import { Certifications } from '@/components/home/Certifications'
import { Contact } from '@/components/home/Contact'
import { useTitle } from '@/hooks/useTitle'

/** Homepage — hero plus concise previews of every dedicated section. */
export function HomePage() {
  useTitle()
  return (
    <>
      <Hero />
      <Snapshot />
      <FeaturedProjects />
      <About />
      <Experience />
      <Expertise />
      <Certifications />
      <Contact />
    </>
  )
}
