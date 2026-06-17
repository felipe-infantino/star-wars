import { test, expect } from '@playwright/test'
import { RESOURCES, PAGE_SIZE } from './fixtures'

for (const { path, title, count } of RESOURCES) {
  const totalPages = Math.ceil(count / PAGE_SIZE)

  test.describe(`${title} list page`, () => {
    test('shows the heading, result count and one page of items', async ({ page }) => {
      await page.goto(path)
      await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible()
      await expect(page.getByText(`${count} results — page 1 of ${totalPages}`)).toBeVisible()
      await expect(page.locator('main ul > li')).toHaveCount(Math.min(count, PAGE_SIZE))
    })

    test('hides the Previous link on the first page', async ({ page }) => {
      await page.goto(path)
      await expect(page.getByRole('link', { name: '← Previous' })).toHaveCount(0)
    })

    if (totalPages > 1) {
      test('paginates forward and back', async ({ page }) => {
        await page.goto(path)
        await page.getByRole('link', { name: 'Next →' }).click()

        await expect(page).toHaveURL(`${path}?page=2`)
        await expect(page.getByText(`page 2 of ${totalPages}`)).toBeVisible()

        await page.getByRole('link', { name: '← Previous' }).click()
        await expect(page).toHaveURL(`${path}?page=1`)
      })
    } else {
      test('has no Next link since everything fits on one page', async ({ page }) => {
        await page.goto(path)
        await expect(page.getByRole('link', { name: 'Next →' })).toHaveCount(0)
      })
    }

    test('navigates to a detail page when an item is clicked', async ({ page }) => {
      await page.goto(path)
      await page.locator('main ul > li a').first().click()

      await expect(page).toHaveURL(new RegExp(`${path}/\\d+$`))
      await expect(page.getByRole('button', { name: '← Back' })).toBeVisible()
    })
  })
}
