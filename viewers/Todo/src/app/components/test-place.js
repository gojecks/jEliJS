Element({
    selector: "test-place",
    template: "<j-place></j-place>",
    DI: ['ElementRef?']
})
export function TestPlaceElement(elementRef) {
    this.test = false;
    this.html = '';
}