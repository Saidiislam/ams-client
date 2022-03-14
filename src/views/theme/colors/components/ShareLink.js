import React from 'react'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilShare } from '@coreui/icons'
// eslint-disable-next-line react/prop-types
function ShareLink({ label, text, title }) {
  const canonical = document.querySelector('link[rel=canonical]')
  let url = canonical ? canonical.href : document.location.href
  const shareDetails = { url, title, text }

  const handleSharing = async () => {
    const navigator = window.navigator
    console.log(navigator)
    // console.log(shareDetails)
    try {
      await navigator
        .share(shareDetails)
        .then(() => console.log('Hooray! Your content was shared to tha world'))
    } catch (error) {
      console.log(`Oops! I couldn't share to the world because: ${error}`)
    }
  }
  return (
    <CButton style={{ margin: '10px' }} color="secondary" onClick={handleSharing}>
      <CIcon icon={cilShare} />
    </CButton>
  )
}
export default ShareLink
