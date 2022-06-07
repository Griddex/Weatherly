import { expect, test } from "@playwright/test";
import baseUrl from "../weatherly-fe/src/Application/Services/BaseUrl";
import uniq from "lodash.uniq";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test.describe("Display weather summary and weather cards", () => {
  test("should display only banner and select city dropdown on initial page load", async ({
    page,
  }) => {
    //Banner title is displayed
    await expect(page.locator('header:has-text("Weatherly.IO")')).toBeVisible();

    //Select city dropdown is present
    await expect(page.locator('form:has-text("Select City")')).toBeVisible();

    //forecast div container is present but nothing is displayed
    await expect(await page.locator(".forecast").textContent()).toEqual("");
  });

  test("should successfully select a city and display weather info", async ({
    page,
  }) => {
    //Click on Select city dropdown
    await page.locator('form:has-text("Select City")').click();

    //Select Toronto city
    await page.locator("text=Toronto").click();

    //Confirm weather summary is present
    const wthNow = page.locator(".weathernow");
    await expect(wthNow).toBeVisible();

    //Confirm 3 weather cards are visible
    const wthCards = page.locator(".weatherCard");
    await expect(await wthCards.count()).toBe(3);

    //Confirm forecast button is visible in active state
    const frcstBtn = page.locator(".btnForecast");
    await expect(frcstBtn).toBeVisible();
  });

  test("should select a city, display weather cards for city and display forecast data on clicking show button", async ({
    page,
  }) => {
    //Click on Select city dropdown
    await page.locator('form:has-text("Select City")').click();

    //Select Toronto city
    await page.locator("text=Toronto").click();

    //Confirm weather summary is present
    const wthNow = page.locator(".weathernow");
    await expect(wthNow).toBeVisible();

    //Confirm 3 weather cards are visible
    const wthCards = page.locator(".weatherCard");
    await expect(await wthCards.count()).toBe(3);

    //Confirm forecast button is visible in active state
    const frcstBtn = page.locator(".btnForecast");
    await expect(frcstBtn).toBeVisible();

    //Click show Forecast button
    await frcstBtn.click();

    //Forecast button is inaactive
    expect(frcstBtn).toBeDisabled();

    //Forecast data table is displayed
    const table = page.locator("table");
    await expect(table).toBeVisible();

    //Forecast table has expected no. of columns
    await expect(await page.locator("th").count()).toBe(10);

    const forecastTableHeaders = [
      "SN",
      "TEMP",
      "FEELSLIKE",
      "MINTEMP",
      "MAXTEMP",
      "PRESSURE",
      "HUMIDITY",
      "WEATHER",
      "WINDSPEED",
      "VISIBILITY",
    ];

    //forecast table has all headers present
    const headers = page.locator("table th");
    const texts = await headers.allTextContents();
    await expect(texts).toEqual(forecastTableHeaders);

    //forecast table has first row with no missing data
    const firstDataRow = page.locator("tr td");
    const firstRowData = await firstDataRow.allTextContents();
    const dataChecks = firstRowData.map((t) => !!t.match(/\S/));
    const uniqDataChecks = uniq(dataChecks);
    await expect(uniqDataChecks).toEqual([true]);

    //Forecast table pagination is present with expected number of controls
    const pgtnBtns = page.locator(".days button");
    await expect(await pgtnBtns.count()).toBeLessThanOrEqual(6);

    //Forecast table pagination displays correct dates
    const pgtnBtnsTexts = await pgtnBtns.allTextContents();
    const checks = pgtnBtnsTexts.map((t) => !!t.match(/[a-zA-Z]{3}\s\d{1,2}/));
    const uniqChecks = uniq(checks);
    await expect(uniqChecks).toEqual([true]);
  });

  test("clicking pagination buttons apply the correct styles", async ({
    page,
  }) => {
    //Click on Select city dropdown
    await page.locator('form:has-text("Select City")').click();

    //Select Toronto city
    await page.locator("text=Toronto").click();

    //Click show Forecast button
    const frcstBtn = page.locator(".btnForecast");
    await frcstBtn.click();

    //Check first button initial style & on click
    const firstBtn = page.locator(".days button").nth(0);
    await expect(firstBtn).toHaveCSS(
      "background-color",
      "rgba(255, 0, 0, 0.88)"
    );
    await expect(firstBtn).toHaveCSS("color", "rgb(255, 255, 255)");

    //Check 2nd button initial style
    const scndBtn = page.locator(".days button").nth(1);

    //Check 2nd button  style  on click
    await scndBtn.click();
    await expect(scndBtn).toHaveCSS(
      "background-color",
      "rgba(255, 0, 0, 0.88)"
    );
    await expect(scndBtn).toHaveCSS("color", "rgb(255, 255, 255)");
  });
  test("clicking pagination buttons render the associated forecast table", async ({
    page,
  }) => {
    //Click on Select city dropdown
    await page.locator('form:has-text("Select City")').click();

    //Select Toronto city
    await page.locator("text=Toronto").click();

    //Click show Forecast button
    const frcstBtn = page.locator(".btnForecast");
    await frcstBtn.click();

    const firstRowValuesStrArr = [];
    const noOfBtns = await page.locator(".days button").count();
    for (let i = 0; i < noOfBtns; i++) {
      const btn = page.locator(".days button").nth(i);
      firstRowValuesStrArr.push((await btn.allTextContents()).join());
    }

    await expect(noOfBtns).toBe(uniq(firstRowValuesStrArr).length);
  });

  test("weather api should return data", async ({ request }) => {
    const url = `${baseUrl}/weather/?q=Calgary,CA`;

    const data = await request.get(url);
    expect(data.ok()).toBeTruthy();
  });
});
