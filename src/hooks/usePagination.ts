import { useMemo } from "react"

type PaginationItem = number | "..."

interface UsePaginationProps {
  currentPage: number
  totalPages: number
  siblingCount?: number // pages on each side of current
}

export const usePagination = ({
  currentPage,
  totalPages,
  siblingCount = 1,
}: UsePaginationProps): PaginationItem[] => {
  return useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 5
    // first + last + current + 2 siblings + 2 dots

    // Case 1: no dots needed
    if (totalPages <= totalPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1)
    const rightSibling = Math.min(currentPage + siblingCount, totalPages)

    const showLeftDots = leftSibling > 2
    const showRightDots = rightSibling < totalPages - 1

    const pages: PaginationItem[] = []

    // Always include first page
    pages.push(1)

    // Left dots
    if (showLeftDots) {
      pages.push("...")
    }

    // Middle pages
    const start = showLeftDots ? leftSibling : 2
    const end = showRightDots ? rightSibling : totalPages - 1

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // Right dots
    if (showRightDots) {
      pages.push("...")
    }

    // Always include last page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }, [currentPage, totalPages, siblingCount])
}
