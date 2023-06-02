import {helionHomeUrl, searchProductUrl, cartUrl} from "../../config/pagesUrl";
import {searchPhrase, alertMessage, deletedProductMessage} from "../../config/data";
import SearchBarPage from "../../pages/components/SearchBarPage";
import SearchResultPage from "../../pages/SearchResultPage";
import ProductPage from "../../pages/ProductPage";
import CartPage from "../../pages/CartPage";

describe("E2E - Products", async () => {
    let productTitle:string = "";
    let price:string = "";

    before(() => {
        browser.url(helionHomeUrl)
    })

    it("Should type search pharse and click search icon", async () => {
        await SearchBarPage.typeSearchPhrase(searchPhrase);
        await SearchBarPage.clickOnSearchIcon();
        await expect(browser).toHaveUrl(searchProductUrl);
    })

    it("Should click on first book", async () => {
        await SearchResultPage.clickOnFirstBookItem();
        await ProductPage.productTitleIsVisible();
        await ProductPage.addToCartBtnIsVisible();
        productTitle = await ProductPage.getProductTitleValue();
        price = await ProductPage.getProductPrice();
    })

    it("Should click on add to cart button", async () => {
        await ProductPage.clickOnAddToCartBtn();
        await expect(browser).toHaveUrlContaining(cartUrl);
        await expect(await CartPage.getSuccessAlertValue()).toContain(productTitle);
        await expect(await CartPage.getTotalPriceValue()).toContain(price);
    })

    it("Should delete product from cart", async () => {
        await CartPage.clickOnCheckbox();
        await CartPage.clickOnDeleteSelectedLabel();
        await expect(await browser.getAlertText()).toContain(alertMessage);
        await CartPage.acceptDeleteAlert();
        await expect(await CartPage.getDeleteAlertMessageValue()).toContain(deletedProductMessage);
    })
})