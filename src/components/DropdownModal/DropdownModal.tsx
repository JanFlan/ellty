import { useState } from 'react'
import Button from '../Button'
import Divider from '../Divider'
import './DropdownModal.css'
import type { PageItem } from './types'

const DropdownModal = () => {
  const [pages, setPages] = useState<PageItem[]>([
    { id: 'all', label: 'All pages', checked: false },
    { id: 'page1', label: 'Page 1', checked: false },
    { id: 'page2', label: 'Page 2', checked: false },
    { id: 'page3', label: 'Page 3', checked: false },
    { id: 'page4', label: 'Page 4', checked: false },
  ])

  /**
   * handles checkbox changes for both "All pages" and individual pages
   * when "All pages" is clicked, toggles all pages
   * when individual page is clicked, updates that page and syncs "All pages" state
   * @param {string} id The id of the item that was clicked
   */
  const handleCheckboxChange = (id: string) => {
    if (id === 'all') {
      // toggle all pages when "All pages" is clicked
      const isAllChecked = pages[0].checked
      setPages((prevPages) =>
        prevPages.map((page) => ({ ...page, checked: !isAllChecked }))
      )
    } else {
      // toggle the clicked page
      const updatedPages = pages.map((page) =>
        page.id === id ? { ...page, checked: !page.checked } : page
      )

      // sync "All pages" checkbox, check if all individual pages are selected
      const pageItems = updatedPages.slice(1) // exclude "All pages" from the check
      const areAllPagesSelected = pageItems.every((p) => p.checked)

      updatedPages[0].checked = areAllPagesSelected
      setPages(updatedPages)
    }
  }

  /**
   * handles the Done button click
   */
  const handleDone = () => {
    // filter out "All pages" and get only the actual selected pages
    const selectedPages = pages.filter((p) => p.checked && p.id !== 'all')
    console.log('Selected pages:', selectedPages)
  }

  return (
    <div className="dropdown-modal">
      <div className="dropdown-content">
        {pages.map((page, index) => (
          <div key={page.id}>
            <div className="dropdown-item">
              <label htmlFor={`dropdown-${page.id}`} className="dropdown-label">
                {page.label}
              </label>
              <input
                type="checkbox"
                id={`dropdown-${page.id}`}
                className="dropdown-checkbox"
                checked={page.checked}
                onChange={() => handleCheckboxChange(page.id)}
              />
            </div>
            {/* add divider after "All pages" */}
            {index === 0 && <Divider />}
          </div>
        ))}
        <Divider />
        <div className="dropdown-button-container">
          <Button onClick={handleDone}>Done</Button>
        </div>
      </div>
    </div>
  )
}

export default DropdownModal

