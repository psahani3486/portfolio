import { personalInfo } from '../data/resumeData'

/**
 * Gets absolute or base-relative URL for static assets.
 */
export function getAssetUrl(path) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const baseUrl = import.meta.env.BASE_URL || '/'
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return baseUrl.endsWith('/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/${cleanPath}`
}

/**
 * Robust file downloader:
 * 1. Fetches file via HTTP request
 * 2. Creates a Blob Object URL
 * 3. Triggers browser download with custom filename
 * 4. Tries fallback URLs/casing if initial fetch fails
 * 5. Falls back to standard tab open/anchor download if Blob fetch is blocked
 */
export async function downloadFile(primaryUrl, filename, altUrl = null) {
  const targetUrl = getAssetUrl(primaryUrl)
  const fallbackUrl = altUrl ? getAssetUrl(altUrl) : null

  const attemptDownload = async (url) => {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => window.URL.revokeObjectURL(blobUrl), 10000)
    return true
  }

  try {
    await attemptDownload(targetUrl)
    return true
  } catch (err) {
    console.warn(`Primary download failed for ${targetUrl}:`, err)
    if (fallbackUrl) {
      try {
        await attemptDownload(fallbackUrl)
        return true
      } catch (fallbackErr) {
        console.warn(`Fallback download failed for ${fallbackUrl}:`, fallbackErr)
      }
    }
  }

  // Final fallback: Direct browser link navigation with target="_blank"
  try {
    const link = document.createElement('a')
    link.href = targetUrl
    link.download = filename
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    return true
  } catch (e) {
    console.error('All download attempts failed:', e)
    return false
  }
}

export async function downloadSdeResume() {
  const url = personalInfo.sdeResumeUrl || '/resume.pdf'
  return await downloadFile(url, 'Pankaj_SDE_FullStack_Resume.pdf', '/resume.pdf')
}

export async function downloadDataAnalystResume() {
  const url = personalInfo.dataAnalystResumeUrl || '/data_analyst_Resume.pdf'
  return await downloadFile(
    url, 
    'Pankaj_DataAnalyst_BI_Resume.pdf', 
    '/data_analyst_resume.pdf'
  )
}

export async function downloadBothResumes() {
  await downloadSdeResume()
  await new Promise((resolve) => setTimeout(resolve, 600))
  await downloadDataAnalystResume()
}
