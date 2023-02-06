//knackhome.page.ts
import { expect, Locator, Page } from '@playwright/test';

export class KnackHomePage {
    readonly url ="https://builder.knack.com/test-playwright/warehouse-manager/";
    readonly page: Page;
    readonly pagesMenuLeft: Locator;
    readonly recordsMenuLeft: Locator;
    readonly inventoryAdmin: Locator;
    readonly inventoryWarehouse: Locator;
    readonly inventorySubmenu:Locator;
    readonly blur: Locator;
    readonly addFiltersKnack: Locator;
    readonly filterAddfilters: Locator;
    readonly operatorAddfilters: Locator;
    readonly valueAddFilters: Locator;
    readonly submitAddFilters: Locator;
    readonly onHand: Locator;
    readonly colorDisplayRuleInput: Locator;
    readonly saveDisplayRule: Locator;
    readonly loader: Locator;
    readonly liveAppLink: Locator;

constructor(page: Page) {
    this.page = page;
    this.pagesMenuLeft = page.locator('//a[@data-cy="nav-pages"]');
    this.recordsMenuLeft = page.locator('//a[@data-cy="nav-records"]');
    this.inventoryAdmin = page.locator('//div[@data-cy="Admin > Inventory"]');
    this.inventoryWarehouse = page.locator('//a[@data-cy="Object Warehouse Inventory"]');
    this.inventorySubmenu = page.locator('//div[@data-cy="Inventory"]');
    this.blur = page.locator('//div[@class="blur"]');
    this.filterAddfilters = page.locator('//select[@data-cy="field-list-field"]');
    this.operatorAddfilters = page.locator('//select[@data-cy="field-list-operator"]');
    this.valueAddFilters = page.locator('//select[@data-cy="dropdown-select"]');
    this.submitAddFilters = page.locator('//button[@data-cy="save-filters"]');
    this.addFiltersKnack = page.locator('//a[@data-cy="add-filters"]');
    this.onHand = page.locator('//span[normalize-space()="On-Hand"]//following-sibling::div[@class="kn-item"]//div[@class="overlay"]');
    this.colorDisplayRuleInput = page.locator('//div[@class="kn-colorInput"]//input');
    this.saveDisplayRule = page.locator('//a[@data-cy="toolbox-save"]');
    this.loader = page.locator('//div[@id="kn-layout"]//div[@id="kn-loader"]');
    this.liveAppLink = page.locator('//nav[@data-cy="nav-page-menu"]//a');
}

    async goto(){
        await this.page.goto(this.url);
    }
    async clickOnPagesMenuLeft(){
        await this.pagesMenuLeft.waitFor({state:"visible"});
        await this.pagesMenuLeft.click();
    }

    async clickOnRecordsMenuLeft(){
        await this.recordsMenuLeft.waitFor({state:"visible"});
        await this.recordsMenuLeft.click();
    }

    async clickOnInventory(){
        await this.inventoryAdmin.waitFor({state:"visible"});
        await this.inventoryAdmin.click();
        await this.inventorySubmenu.waitFor({state:"visible"});
        await this.inventorySubmenu.click();
    }

    async clickOnWarehouseInventory(){
        await this.inventoryWarehouse.waitFor({state:"visible"});
        await this.inventoryWarehouse.click();
    }

    async clickOnBlur(){
        await this.blur.click();
    }

    async clickOnAddFilters(){
        await this.addFiltersKnack.click();
    }

    async clickOnOnHand(){
        await this.onHand.waitFor({state:"visible"});
        await this.onHand.click();
    }

    async setFilter(filter: string, operator: string, value: string){
        await this.filterAddfilters.waitFor({state:"visible"});
        await this.operatorAddfilters.waitFor({state:"visible"});
        await this.filterAddfilters.selectOption({ label: filter });
        await this.operatorAddfilters.selectOption({ label: operator });
        await this.valueAddFilters.selectOption({ label: value });
        await this.submitAddFilters.click();
    }

    async fillInputColorDisplayRule(color: string){
        await this.colorDisplayRuleInput.waitFor({state:"visible"});
        await this.colorDisplayRuleInput.fill(color);
    }

    async clickOnSaveButtonDisplayRule(){
        await this.saveDisplayRule.click();
    }

    async clickOnLiveAppLink(){
        await this.liveAppLink.waitFor({state:"visible"});
        await this.liveAppLink.click();
    }

}