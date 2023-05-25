const openBillingsPage = async () => {
    try {
        // find out the a tag with href = app/settings/billing

        const billingButton = triggerClickOnElement(
            document.querySelector('a[href="app/settings/billing"]')
        );

        // if billingButton is not found return false
        if (!billingButton) return false;

        // wait for the billing page to load
        await sleep(1000);

        // return true if billing page is loaded
        return true;
    } catch (error) {
        console.error("Error while opening Billinngs page", error);
        return false;
    }
};
