import { test, expect } from '@playwright/test';
import { color } from 'pengrape';
import { ConvertRGBtoHex } from '../util/util';
import { KnackHomePage } from '../pages/knackhome.page';
import { LiveAppWarehousePage } from '../pages/liveappwarehouse.page';


test.beforeEach(async ({ page }) => {
  await page.goto('https://builder.knack.com/test-playwright/warehouse-manager/login');
  
  var accountEmail = 'vodet73369@breazeim.com';
  var accountPass = 'Vodet123';

  await page.fill('#email >> nth=1', accountEmail);
  await page.fill('#password >> nth=1', accountPass);
  await page.click('input[type="submit"] >> nth=1');
  });

test('Test One: Icon Color for Display Rules', async ({ page }) => {

  const homepage = new KnackHomePage(page);
  await homepage.goto();
  await homepage.clickOnPagesMenuLeft();
  await homepage.clickOnInventory();
  await homepage.clickOnBlur();
  await homepage.clickOnOnHand();
  const item = await page.$eval<string, HTMLSelectElement>('//div[@class="display-rule-actions"]//select', e => e.options[e.selectedIndex].text);

  expect(item).toBe('Display Icon');

  const randomColor = color({ format: 'hex' });
  await homepage.fillInputColorDisplayRule(randomColor);
  await homepage.clickOnSaveButtonDisplayRule();
  const bgOverlay= page.locator('//div[@id="kn-layout"]//div[@id="kn-loader"]');
  expect(bgOverlay).toBeVisible();

  // Get page after clicking Live App
    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        await homepage.clickOnLiveAppLink() // Opens a new tab
    ])
  await newPage.waitForLoadState();
 
  var accountEmail = 'admin@test.com';
  var accountPass = '';

  const warehouse = new LiveAppWarehousePage(newPage);
  await warehouse.login(accountEmail, accountPass);
  await warehouse.clickOnInventoryTab();
  var warningIcon = await page.$('//i[contains(@class,"fa-warning")]');
  var styleAttribute = String(await warningIcon?.getAttribute('style'));
  
  var index = styleAttribute.indexOf("("); 
  var array = styleAttribute.substring(index+1, styleAttribute.length-2).split(',');
  var colorValue = ConvertRGBtoHex(parseInt(array[0].trim()), parseInt(array[1].trim()), parseInt(array[2].trim()));
  
  expect(randomColor).toBe(colorValue);
  

});


test('Test Two: Filtering Inventory', async ({ page }) => {

    const homepage = new KnackHomePage(page);
    await homepage.goto();
    await homepage.clickOnRecordsMenuLeft();
  
    await homepage.clickOnWarehouseInventory();
    await homepage.clickOnAddFilters();
    await homepage.setFilter('Needs Re-Order', 'is', 'Yes');
    const bgOverlay= page.locator('//div[@id="kn-layout"]//div[@id="kn-loader"]');
    expect(bgOverlay).toBeVisible();
    var countRecordsKnack= await page.locator('//tbody//tr').count();
    
    
  
    // Get page after clicking Live App
  const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      page.click('//nav[@data-cy="nav-page-menu"]//a') // Opens a new tab
    ])
    await newPage.waitForLoadState();
   
    var accountEmail = 'admin@test.com';
    var accountPass = '';

    const warehouse = new LiveAppWarehousePage(newPage);
    await warehouse.login(accountEmail, accountPass);
    await warehouse.clickOnInventoryTab();
    await warehouse.clickOnAddFilters();
    await warehouse.setFilter('Needs Re-Order', 'is', 'Yes');
    var countRecordsWarehouse= await newPage.locator('//tbody//tr[@id]').count();
    
    expect(countRecordsKnack).toBe(countRecordsWarehouse);
    
  
  });