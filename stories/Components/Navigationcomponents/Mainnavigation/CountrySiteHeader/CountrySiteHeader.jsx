import React, { useEffect } from 'react';
import pnud from '../../../../assets/images/undp-logo-blue.svg';
import { getMegaMenu } from '../../../../assets/js/navigation-data';
import {
  navigationInitialize,
  navigationMultiLevelEdgeDetection,
  navigationOverFlow,
} from '../../../../assets/js/navigation';
import { Logo } from '../../../../Atom/Logo/Logo';
import { CtaButton } from '../../../UIcomponents/Buttons/CtaButton/CtaButton';
import { Menu } from '../../Menu/Menu';
import { Languageswitcher } from '../../../UIcomponents/LanguageSwitcher/LanguageSwitcher';
import MegaMenu from '../MegaMenu/MegaMenu';
import MenuMultiLevel from '../MenuMultiLevel/MenuMultiLevel';
import MobileNav from '../MobileNav/MobileNav';
import './country-site-header.scss';
import '../../../../assets/scss/_grid.scss';
import '../../../../assets/js/lazyload';
import '../../../../Utilities/FrostedImage/frosted-background.scss';
import menuJsonData from '../../../../assets/js/navigation-data.json';

function CountrySiteHeader({
  languageswitcherData,
  navigationData,
  locale,
  backcaption,
  locationData,
  langSelect,
  siteTitleData,
  ...args
}) {
  useEffect(() => {
    getMegaMenu(locale);
    navigationInitialize(locale);
    navigationOverFlow();
    navigationMultiLevelEdgeDetection();
  }, [locale, args.menu_type]);
  const menuType = args.menu_type === 'Mega menu' || typeof (args.menu_type) == 'undefined' ? 'mega_menu' : 'dropdown';
  const menuData = typeof (args.menu_type) == 'undefined' ? navigationData : menuJsonData;
  const overflow = args.menu_type === 'Multi-level dropdown';
  const multiLevel = args.menu_type === 'Multi-level dropdown';
  return (
    <header className="country-header country-load-animation">
      <section className="header">
        <div className="grid-container fluid">
          <div className="grid-x grid-margin-x align-content-middle">
            <div className="cell small-8 large-2 shrink align-self-middle top-left">
              <a href="#" className="logo" tabIndex="0" title="UNDP Logo homepage link">
                <Logo src={pnud} alt="UNDP Logo" />
              </a>
              <div className="site-title">
                {!!siteTitleData.label && (
                  <span><a href="#" title="UNDP homepage link">{siteTitleData.label}</a></span>
                )}
                <span><a href="#" title="UNDP homepage link">{siteTitleData.span}</a></span>
              </div>
            </div>
            <div className="cell small-1 large-auto align-content-middle top-center">
              {menuType === 'dropdown' && (
                <MenuMultiLevel data={menuData} locale={locale} multiLevel overflow {...args} />
              )}
              {menuType === 'mega_menu' && (
                <Menu data={menuData} type={menuType} locale={locale} overflow {...args} />
              )}
              {/* Need to generate this in jquery */}
              <div className="menu__overflow__item hidden">
                <button className="menu__overflow__toggle hidden" aria-hidden="true" aria-controls="navigation-dropdown" aria-label="Menu overflow">
                  <span className="hidden">Menu toggle</span>
                </button>
              </div>
            </div>
            <div className="cell small-3 large-3 top-right">
              <Languageswitcher
                data={languageswitcherData.languagedata}
                headerText={languageswitcherData.headerText}
              />
              <button className="menu-hamburger" aria-label="menu-icon">
                <span className="hamburger-line line-top" />
                <span className="hamburger-line line-middle" />
                <span className="hamburger-line line-bottom" />
                Nav toggle
              </button>
              <button className="icon-globe">Global</button>
              <button className="icon-search">Search</button>
              {args.cta_enabled == 'On' && (
                <CtaButton
                  label="Donate"
                  href="#"
                  Icon="No Arrow"
                />
              )}
            </div>
            <MobileNav
              navigationData={navigationData}
              languageswitcherData={languageswitcherData}
              locationData={locationData}
              backcaption={backcaption}
              langSelect={langSelect}
              text="Mobile Nav"
              {...args}
            />
          </div>
        </div>
        {/* Need to generate this in jquery */}
        <div className="grid-container full menu__overflow__container hidden">
          <ul className="dropdown" />
        </div>
      </section>
      {menuType === 'mega_menu' && (
        <div className="mega-wrapper">
          <MegaMenu locale={locale} />
        </div>
      )}
    </header>
  );
}

export default CountrySiteHeader;
