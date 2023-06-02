import GobalPage from "../../pages/GobalPage";
import {helionHomeUrl, notFoundUrl, searchPageUrl} from "../../config/pagesUrl";
import SearchBarPage from "../../pages/components/SearchBarPage";
import {incorrectsearchPhrase, notFoundMessage, searchPhrase, searchResultTitle} from "../../config/data";
import SearchResultPage from "../../pages/SearchResultPage";

describe("E2E - SearchBar", async () => {
    it("Should open helion home page and veryfi url and visible searchbar", async () => {
        await GobalPage.openPage(helionHomeUrl, helionHomeUrl);
        await SearchBarPage.searchBarIsVisible();
    })

    it("Shoul click on search icon and verefi url", async () => {
        await SearchBarPage.clickOnSearchIcon();
        await expect(browser).toHaveUrl(helionHomeUrl);
    })

    it("Rodo confirmation", async () => {
        await SearchBarPage.clickRodo();
    })

    it("Should type search value and verify visible popup" , async () => {
        await SearchBarPage.typeSearchPhrase(searchPhrase);
        await SearchBarPage.suggestPopupIsVisible();
    })

    it("Should click on see all books button", async () => {
        await SearchBarPage.clickOnSeeAllBooksBtn();
        await expect(browser).toHaveUrl(searchPageUrl);
    })

    it("Should verify visible correctly title and number of books", async () => {
        const title:string = await SearchResultPage.getPageTitle();
        const numberOfBooks:number = await SearchResultPage.getNumberOfBooks();
        await expect(title).toContain(searchResultTitle);
        await expect(numberOfBooks).toEqual(20);
    })

    it("Should clear input value", async () => {
        await SearchBarPage.clearSearchBar();
        await expect(await SearchBarPage.getInputValue()).toContain("");
    })

    it("Should type incorrect book name and verify alert", async () => {
        await SearchBarPage.typeSearchPhrase(incorrectsearchPhrase);
        await SearchBarPage.clickOnSearchIcon();
        await expect(await SearchBarPage.getNotFoundAlertText()).toContain(notFoundMessage);
    })

    it("Should clear input value and click on search icon", async () => {
        await SearchBarPage.clearSearchBar();
        await SearchBarPage.clickOnSearchIcon();
        await expect(browser).toHaveUrl(notFoundUrl);
        await expect(await SearchBarPage.getInputValue()).toContain(incorrectsearchPhrase);
    })

})