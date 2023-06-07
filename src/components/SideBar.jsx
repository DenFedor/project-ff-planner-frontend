import styled, { css, useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { ROUTES } from '../navigation/routes'

import {
  getBreakpointsStyles,
  getDesktopStyles,
  getTabletStyles,
  useBreakpointValue,
} from '../styles/breakpoints'
import { CloseIcon, UserCheckIcon, CalendarCheckOutIcon, LogOutIcon } from '../assets/icons'
import { AppLogo } from './AppLogo'
import { OpacityButton } from './buttons/OpacityButton'
import { Button } from './buttons/Button'
import { Text } from './Text'

const tabs = [
  {
    type: 'profile',
    text: 'My Account',
    Icon: UserCheckIcon,
    route: '/profile',
  },
  {
    type: 'calendar',
    text: 'Calendar',
    Icon: CalendarCheckOutIcon,
    route: ROUTES.CALENDAR,
  },
]

export const SideBar = ({ isBurgerMenuOpen, setIsBurgerMenuOpen, selectedTab, setSelectedTab }) => {
  // const navigate = useNavigate()
  const theme = useTheme()
  const owerlayRef = useRef()
  const { t } = useTranslation()
  const iconCheckSize = useBreakpointValue({ mobileValue: 20, tabletValue: 24, desktopValue: 24 })
  const iconLogOutSize = useBreakpointValue({ mobileValue: 18, tabletValue: 20, desktopValue: 20 })
  const iconClozeSize = useBreakpointValue({ mobileValue: 25, tabletValue: 33 })

  const handleOwerlayClick = (e) => {
    if (e.target === owerlayRef.current) {
      setIsBurgerMenuOpen(false)
    }
  }

  const handleChangeTab = (type, route) => {
    setSelectedTab(type)
    console.log(route)
    // navigate(`${route}`)
  }

  const handleLogOut = () => {}

  return (
    <SidebarOverlay
      theme={theme}
      onClick={handleOwerlayClick}
      ref={owerlayRef}
      isBurgerMenuOpen={isBurgerMenuOpen}
    >
      <SidebarWrap isBurgerMenuOpen={isBurgerMenuOpen} theme={theme}>
        <div style={{ width: '100%' }}>
          <TopBox>
            <AppLogo orientation='horezontal' />
            <OpacityButton>
              <CloseIconWrap onClick={() => setIsBurgerMenuOpen(false)}>
                <CloseIcon size={iconClozeSize} color={theme.colors.icon} />
              </CloseIconWrap>
            </OpacityButton>
          </TopBox>
          <div style={{ width: '100%' }}>
            <Text type='p' fontWeight={600} color={'sidebarTitle'}>
              {t('User Panel')}
            </Text>
            <TabsWrap>
              {tabs.map(({ type, Icon, text, route }) => (
                <OpacityButton key={type} style={{ width: '100%' }}>
                  <NavButton
                    selected={selectedTab === type}
                    theme={theme}
                    onClick={() => handleChangeTab(type, route)}
                  >
                    <Icon
                      size={iconCheckSize}
                      color={
                        selectedTab === type
                          ? theme.colors.tabContentSelected
                          : theme.colors.tabContent
                      }
                    />
                    <Text
                      type='p'
                      fontWeight={600}
                      color={`${selectedTab === type ? 'tabContentSelected' : 'tabContent'}`}
                    >
                      {t(text)}
                    </Text>
                  </NavButton>
                </OpacityButton>
              ))}
            </TabsWrap>
          </div>
        </div>
        <Button
          isDefaultShadow
          title={t('Log out')}
          onClick={handleLogOut}
          rightIcon={<LogOutIcon size={iconLogOutSize} color={theme.colors.white} />}
        />
      </SidebarWrap>
    </SidebarOverlay>
  )
}

const SidebarOverlay = styled.div`
  ${({ isBurgerMenuOpen, theme }) => css`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
    ${isBurgerMenuOpen &&
    css`
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    `}
    transition: opacity ${theme.animation.sideBarDuration} ${theme.animation.sideBarCubicBezier},
        visibility ${theme.animation.sideBarDuration} ${theme.animation.sideBarCubicBezier};
    background-color: ${theme.colors.sideBarOverlay};
    ${getDesktopStyles(
      css`
        position: static;
        width: 25%;
        opacity: 1;
        visibility: visible;
        pointer-events: all;
      `,
    )};
  `}
`

const SidebarWrap = styled.div`
  ${({ isBurgerMenuOpen, theme }) => css`
    transform: translateX(-100%);
    ${isBurgerMenuOpen && 'transform: translateX(0);'}
    transition: transform ${theme.animation.sideBarDuration} ${theme.animation.sideBarCubicBezier};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    min-height: 100vh;
    background-color: ${theme.colors.background};
    width: 70%;
    padding: 20px 24px;
    ${getBreakpointsStyles({
      tablet: css`
        width: 50%;
      `,
      desktop: css`
        width: 100%;
        transform: translateX(0);
      `,
    })}
  `}
`

const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 64px;
  ${getBreakpointsStyles({
    tablet: css`
      margin-bottom: 50px;
    `,
    desktop: css`
      margin-bottom: 32px;
    `,
  })}
`

const CloseIconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  ${getDesktopStyles(
    css`
      display: none;
    `,
  )}
`

const NavButton = styled.button`
  ${({ selected, theme }) => css`
    display: flex;
    padding: 20px 16px;
    background: transparent;
    border-radius: 8px;
    border: none;
    width: 100%;
    ${selected && `background: ${theme.colors.tabButtonActive};`}
    transition: background ${theme.animation.sideBarDuration} ${theme.animation.sideBarCubicBezier};
  `}
`

const TabsWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 24px;
  ${getTabletStyles({
    tablet: css`
      margin-top: 32px;
    `,
  })}
`
