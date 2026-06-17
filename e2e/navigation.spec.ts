import { test, expect } from '@playwright/test'
import { RESOURCES } from './fixtures'

test.describe('Home page', () => {
  test('lists a link to every resource', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1, name: 'Star Wars' })).toBeVisible()

    const links = page.locator('main')
    for (const { title } of RESOURCES) {
      await expect(links.getByRole('link', { name: title })).toBeVisible()
    }
  })

  test('clicking a resource link navigates to its list page', async ({ page }) => {
    await page.goto('/')
    await page.locator('main').getByRole('link', { name: 'Planets' }).click()
    await expect(page).toHaveURL('/planets')
    await expect(page.getByRole('heading', { level: 1, name: 'Planets' })).toBeVisible()
  })
})

test.describe('Navbar', () => {
  test('shows links to every section on desktop', async ({ page }) => {
    await page.goto('/')
    const desktopNav = page.locator('nav ul.hidden')
    for (const { title } of RESOURCES) {
      await expect(desktopNav.getByRole('link', { name: title })).toBeVisible()
    }
  })

  test('stays present and functional across navigations', async ({ page }) => {
    await page.goto('/')
    await page.locator('nav ul.hidden').getByRole('link', { name: 'Starships' }).click()
    await expect(page).toHaveURL('/starships')
    await page.locator('nav ul.hidden').getByRole('link', { name: 'Home' }).click()
    await expect(page).toHaveURL('/')
  })

  test.describe('mobile menu', () => {
    test.use({ viewport: { width: 375, height: 667 } })

    test('opens on toggle and navigates to the selected section', async ({ page }) => {
      await page.goto('/')
      const toggle = page.getByRole('button', { name: 'Open menu' })
      await expect(toggle).toBeVisible()
      await toggle.click()

      await expect(page.getByRole('button', { name: 'Close menu' })).toBeVisible()
      await page.locator('nav ul.md\\:hidden').getByRole('link', { name: 'Films' }).click()

      await expect(page).toHaveURL('/films')
      await expect(page.getByRole('heading', { level: 1, name: 'Films' })).toBeVisible()
    })
  })
})
