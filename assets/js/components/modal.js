import Foundation from 'foundation-sites'
import ModalSdgs from "../classes/ModalSdgs";

class Modal {
    constructor() {
        this.classHide = 'hide';
        this.modalFilter = null;
        this.currentModal = null;
        this.classModalActive = 'active';
        this.dataOptionDefault = '[data-icon]';
        this.dataOptionClose = '[data-icon-close]';
        this.classModalOpened = 'modal-opened';
        this.navPreviewWidth = 0;
        this.navCurrrentWidth = 0;
        this.dataModalLocationClose = '[data-btn-close]';
        this.classModalOpenFromFooter = 'open-from-footer';
        this.window = $(window);

        this.$body = $('body');
        this.$optionClose = null;
        this.$optionDefalt = null;
        this.$modalReference = null;
        this.$modals = $('[data-modal-open]');
        this.$header = $('[data-navigation]');
        this.$modalFilterName = 'modal-filter';
        this.$btnOpenFilter = '[data-open-filters]';
        this.$btnBackModalFilter = '[data-action-back]';

        //modals: references to close menu opened when the user open a new modal (this class)
        this.menuOpenClass = 'is-active';
        this.bodyMenuOpenClass = 'menu-open modal-open';

        this.$hamburguer = $('[data-hamburger]');
        this.$mainMenu = $('[data-menu-main-options]');
        this.$primaryNav = $('[data-primary-navigation]');
    }

    init() {
        this.listeners();
        this.listenerKeyPress();
    }

    listeners() {
        this.$modals.each((i, modal) => {
            $(modal).click((env) => {
                env.preventDefault();
                this.$modals.removeClass(this.classModalActive);
                const addOptionClose = () => {
                    if ($(modal).data('modal') === 'modal-popular-search') {
                        this.closeMenu();
                        this.$modalReference = $('[data-modal="modal-popular-search"]')
                    }
                    if ($(modal).data('modal') === 'modal-search-offices') {
                        this.$modalReference = $('[data-modal="modal-search-offices"]')
                    }
                };
                addOptionClose();
                $('.menu-modal').addClass('hide');
                const idModalOpen = $(modal).data('modal');
                if (this.$modalReference.hasClass(this.classModalOpened)) {
                    this.beforeCloseModal();
                    return;
                }
                this.closeAllModals();
                if (idModalOpen) {
                    this.currentModal = $('#' + $(modal).data('modal'));
                    if (this.currentModal) {
                        this.navPreviewWidth = this.$header.width();
                        this.$modalReference.addClass(this.classModalOpened)
                        this.$optionClose = this.$modalReference.find(this.dataOptionClose);
                        this.$optionDefalt = this.$modalReference.find(this.dataOptionDefault);
                        this.open();
                        this.navCurrrentWidth = this.$header.width();
                        this.listenerOpenFilters();
                        this.navSetMargin();

                        const mobileModalLocationListenerClose = () => {
                            const btnBack = this.currentModal.find(this.dataModalLocationClose);

                            if (typeof $(modal).data(this.classModalOpenFromFooter) !== 'undefined') {
                                this.closeMenu();
                                this.listenerCloseModal();
                                btnBack.addClass(this.classModalOpenFromFooter);
                            }else {
                                btnBack.removeClass(this.classModalOpenFromFooter);
                            }
                        };
                        mobileModalLocationListenerClose();
                    }
                }
            });
        });
    }

    listenerOpenFilters() {
        const btnFilters = this.currentModal.find(this.$btnOpenFilter)
        if (btnFilters) {
            $(btnFilters).click((evt) => {
                evt.preventDefault();
                const modalFilter = btnFilters.data(this.$modalFilterName);
                if (modalFilter) {
                    this.modalFilter = $('#' + modalFilter);
                    this.openFilters()
                    this.listenerCloseModalFilters();
                }
            })
        }
    }

    listenerCloseModalFilters() {
        const btnCloseFilters = this.modalFilter.find(this.$btnBackModalFilter);
        if (btnCloseFilters) {
            btnCloseFilters.click((evt) => {
                evt.preventDefault();
                this.closeFilters();
            })
        }
    }

    open() {
        this.closeModalSdg();
        this.$body.addClass('modal-open');
        this.currentModal.removeClass('hide');
        if($(window).width() > Foundation.MediaQuery.get('medium')){
            this.inputSearchAutoFocus();
        }
        this.$modalReference.addClass(this.classModalActive);
        this.showOptionClose();
    }

    //the modal hide the (scroll y) so we add his width on navigation to keep the same size
    navSetMargin() {
        let pixels = this.navCurrrentWidth - this.navPreviewWidth;
        if(pixels !== 0) {
            this.$header.css('padding-right', pixels > 0 ? pixels : 0);
        }
    }

    inputSearchAutoFocus() {
        this.currentModal.find('.input-search').focus();
    }

    close() {
        this.currentModal.addClass('hide');
        this.$body.removeClass('modal-open');
        this.$modalReference.removeClass(this.classModalActive)
        this.$header.css('padding-right', 'unset')
    }
    closeAllModals() {
        this.$modals.removeClass(this.classModalOpened);
        this.$modals.find('[data-icon]').removeClass(this.classHide);
        this.$modals.find('[data-icon-close]').addClass(this.classHide);
    }

    openFilters() {
        this.currentModal.addClass('hide');
        this.modalFilter.removeClass('hide');
    }

    closeFilters() {
        this.currentModal.removeClass('hide');
        this.modalFilter.addClass('hide');
    }

    showOptionClose() {
        this.$optionDefalt.addClass(this.classHide);
        this.$optionClose.removeClass(this.classHide);
    }

    showOptionDefault() {
        this.$optionDefalt.removeClass(this.classHide);
        this.$optionClose.addClass(this.classHide);
    }

    closeMenu() {
        this.$primaryNav.removeClass('open');
        this.$mainMenu.addClass(this.classHide);
        this.$body.removeClass(this.bodyMenuOpenClass)
        this.$hamburguer.removeClass(this.menuOpenClass);
    }

    closeModalSdg() {
        const modalSdg = new ModalSdgs();
        modalSdg.close();
    }

    //modal opened from footer
    listenerCloseModal() {
        let btnBack = this.currentModal.find(this.dataModalLocationClose);
        btnBack.click(() => {
            this.close();
        })
    }

    listenerKeyPress() {
        this.window.keyup((e) => {
            if (e.keyCode === 27) { //esc
               this.beforeCloseModal();
            }
        });
    }

    beforeCloseModal() {
        if (this.$modalReference && this.$modalReference.hasClass(this.classModalOpened)) {
            this.showOptionDefault();
            this.$modalReference.removeClass(this.classModalOpened);
            this.close();
        }
    }
}

const init = function () {
    const modals = new Modal();
    modals.init();
};

export default init;
