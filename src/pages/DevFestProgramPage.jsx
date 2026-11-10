import SiteLayout from '@/layouts/SiteLayout'
import DevFestProgram from '@/components/devfest/program/DevFestProgram'

/** /devfest: the Michigan DevFest 2026 speakers and schedule. */
export default function DevFestProgramPage() {
  return (
    <SiteLayout>
      <DevFestProgram />
    </SiteLayout>
  )
}
