import 'foundation-sites/dist/js/foundation'

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

        this.$body = $('body');
        this.$optionClose = null;
        this.$window = $(window);
        this.$optionDefalt = null;
        this.$modalReference = null;
        this.$modals = $('[data-modal-open]');
        this.$header = $('[data-navigation]');
        this.$modalFilterName = 'modal-filter';
        this.$btnOpenFilter = '[data-open-filters]';
        this.$btnCloseCurrentModal = '[data-btn-close]';
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
        this.listenerWindowResize();
    }

    listeners() {
        this.$modals.each((i, modal) => {
            $(modal).click((env) => {
                this.closeMenu();
                env.preventDefault();
                this.$modals.removeClass(this.classModalActive);
                this.$modalReference = $(modal);
                $('.menu-modal').addClass('hide');
                const idModalOpen = $(modal).data('modal');
                if (Foundation.MediaQuery.is('large down') && this.$modalReference.hasClass(this.classModalOpened)) {
                    this.showOptionDefault();
                    this.$modalReference.removeClass(this.classModalOpened);
                    this.close();
                    return;
                }
                if (idModalOpen) {
                    this.currentModal = $('#' + $(modal).data('modal'));
                    if (this.currentModal) {
                        const addOptionClose  = () => {
                            if (Foundation.MediaQuery.is('large down')) {
                                if ($(modal).data('modal') === 'modal-popular-search'){
                                    this.$modalReference = $('.icon-search')
                                }
                            }
                        };
                        addOptionClose();

                        this.navPreviewWidth = this.$header.width();
                        this.$modalReference.addClass(this.classModalOpened)
                        this.$optionClose = this.$modalReference.find(this.dataOptionClose);
                        this.$optionDefalt = this.$modalReference.find(this.dataOptionDefault);
                        this.open();
                        this.navCurrrentWidth =  this.$header.width();
                        this.listenerCloseModal();
                        this.listenerOpenFilters();
                        this.navSetMargin();
                    }
                }
            });
        });
    }

    listenerCloseModal() {
        const btnCloseModal = this.currentModal.find(this.$btnCloseCurrentModal);
        $(btnCloseModal).click((evt) => {
            evt.preventDefault();
            this.close()
        })
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

    listenerWindowResize() {
        this.$window.resize(() => {
            if (Foundation.MediaQuery.is('large down') && this.$optionClose) {
                this.showOptionClose();
            } else if (this.$optionClose) {
                this.showOptionDefault();
            }
        })
    }

    open() {
        this.$body.addClass('modal-open');
        this.currentModal.removeClass('hide');
        this.inputSearchAutoFocus();
        this.$modalReference.addClass(this.classModalActive);

        if (Foundation.MediaQuery.is('large down')) {
            this.showOptionClose();
        }
    }

    //the modal hide the (scroll y) so we add his width on navigation to keep the same size
    navSetMargin() {
        this.$header.css('padding-right', this.navCurrrentWidth - this.navPreviewWidth);
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
}

const init = function () {
    const modals = new Modal();
    modals.init();
};

export default init;