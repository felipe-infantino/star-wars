import { test, expect } from '@playwright/test'
import { DETAIL_FIXTURES } from './fixtures'

for (const { path, name, props, accordions } of DETAIL_FIXTURES) {
  test.describe(`Detail page (${path} — ${name})`, () => {
    test('shows the name, key properties and related resource counts', async ({ page }) => {
      await page.goto(path)

      await expect(page.getByRole('heading', { level: 1, name })).toBeVisible()

      const propsGrid = page.locator('dl')
      for (const value of props) {
        await expect(propsGrid.getByText(value, { exact: true })).toBeVisible()
      }

      for (const [label, count] of Object.entries(accordions)) {
        await expect(page.getByText(`${label} (${count})`)).toBeVisible()
      }
    })

    test('the Back button returns to the list page it was opened from', async ({ page }) => {
      const listPath = path.replace(/\/\d+$/, '')
      await page.goto(listPath)
      await page.locator('main ul > li a').first().click()

      await page.getByRole('button', { name: '← Back' }).click()
      await expect(page).toHaveURL(listPath)
    })
  })
}

test.describe('Person detail page (/people/1 — Luke Skywalker)', () => {
  test('shows properties and related resource accordions', async ({ page }) => {
    await page.goto('/people/1')

    await expect(page.getByRole('heading', { level: 1, name: 'Luke Skywalker' })).toBeVisible()

    const props = page.locator('dl')
    await expect(props.getByText('Gender')).toBeVisible()
    await expect(props.getByText('male', { exact: true })).toBeVisible()
    await expect(props.getByText('19BBY')).toBeVisible()
    await expect(props.getByText('172 cm')).toBeVisible()
    await expect(props.getByText('77 kg')).toBeVisible()

    await expect(page.getByText('Starships (2)')).toBeVisible()
    await expect(page.getByText('Vehicles (2)')).toBeVisible()
    await expect(page.getByText('Films (5)')).toBeVisible()
    await expect(page.getByText('Species (1)')).toBeVisible()
  })

  test('expanding an accordion reveals linked resources', async ({ page }) => {
    await page.goto('/people/1')
    await page.getByText('Films (5)').click()
    await expect(page.getByRole('link', { name: /A New Hope/ })).toBeVisible()
  })
})

test.describe('Film detail page (/films/1 — A New Hope)', () => {
  test('shows the opening crawl, properties and related resource counts', async ({ page }) => {
    await page.goto('/films/1')

    await expect(page.getByRole('heading', { level: 1, name: 'A New Hope' })).toBeVisible()
    await expect(page.getByText(/It is a period of civil war/)).toBeVisible()

    const props = page.locator('dl')
    await expect(props.getByText('4', { exact: true })).toBeVisible()
    await expect(props.getByText('George Lucas')).toBeVisible()
    await expect(props.getByText('1977-05-25')).toBeVisible()

    await expect(page.getByText('Characters (18)')).toBeVisible()
    await expect(page.getByText('Planets (3)')).toBeVisible()
    await expect(page.getByText('Starships (8)')).toBeVisible()
    await expect(page.getByText('Vehicles (4)')).toBeVisible()
    await expect(page.getByText('Species (5)')).toBeVisible()
  })

  test('expanding the Characters accordion reveals a linked person', async ({ page }) => {
    await page.goto('/films/1')
    await page.getByText('Characters (18)').click()
    await expect(page.getByRole('link', { name: /Luke Skywalker/ })).toBeVisible()
  })
})

test.describe('Back navigation', () => {
  test('the Back button returns to the previous list page and state', async ({ page }) => {
    await page.goto('/people?page=2')
    await page.locator('main ul > li a').first().click()
    await expect(page).toHaveURL(/\/people\/\d+$/)

    await page.getByRole('button', { name: '← Back' }).click()
    await expect(page).toHaveURL('/people?page=2')
    await expect(page.getByText('page 2 of 9')).toBeVisible()
  })
})
