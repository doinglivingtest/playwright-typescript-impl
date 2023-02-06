//knackhome.page.ts
import { expect, Locator, Page } from '@playwright/test';

export class LiveAppWarehousePage {
    readonly page: Page;
    readonly emailLogin: Locator;
    readonly passwordLogin: Locator;
    readonly buttonLogin:Locator;
    readonly inventoryTab: Locator;
    readonly addFilters: Locator;
    readonly filterAddfilters: Locator;
    readonly operatorAddfilters: Locator;
    readonly valueAddFilters: Locator;
    readonly submitAddFilters: Locator;

constructor(page: Page) {
    this.page = page;
    this.emailLogin = page.locator('#email');
    this.passwordLogin = page.locator('#password');
    this.buttonLogin = page.locator('input[type="submit"]');
    this.inventoryTab = page.locator('(//a[contains(@data-kn-slug,"inventory")])[1]');
    this.addFilters = page.locator('//div[@class="kn-filters-nav"]//a');
    this.filterAddfilters = page.locator('//select[@class="field select"]');
    this.operatorAddfilters = page.locator('//select[@class="operator kn-select"]');
    this.valueAddFilters = page.locator('//span[@class="kn-filter-value kn-select value"]//select');
    this.submitAddFilters = page.locator('//input[@id="kn-submit-filters"]');
}

    async login(email: string, password: string){
        await this.emailLogin.waitFor({state:"visible"});
        await this.passwordLogin.waitFor({state:"visible"});
        await this.emailLogin.fill(email);
        await this.passwordLogin.fill(password);
        await this.buttonLogin.click();
    }

    async clickOnInventoryTab(){
        await this.inventoryTab.waitFor({state:"visible"});
        await this.inventoryTab.click();
    }

    async clickOnAddFilters(){
        await this.addFilters.click();
    }

    async setFilter(filter: string, operator: string, value: string){
        await this.filterAddfilters.waitFor({state:"visible"});
        await this.operatorAddfilters.waitFor({state:"visible"});
        await this.filterAddfilters.selectOption({ label: filter });
        await this.operatorAddfilters.selectOption({ label: operator });
        await this.valueAddFilters.selectOption({ label: value });
        await this.submitAddFilters.click();
    }
}