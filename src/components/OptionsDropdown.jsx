import styled, { css } from 'styled-components'
import { OpacityButton } from './buttons/OpacityButton'
import { Fragment, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export const OptionsDropdown = ({ children, renderOption, onShowClassName, options }) => {
  const [showOptions, setShowOptions] = useState(false)
  const [mousePosition, setMousePosition] = useState(null)

  const wrapper = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapper.current && !wrapper.current.contains(event.target)) {
        setShowOptions(false)
      }
    }

    document.addEventListener('click', handleClickOutside, true)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return (
    <Wrapper>
      <OpacityButton
        ref={wrapper}
        className={showOptions ? onShowClassName : 'none'}
        onClick={(e) => {
          setMousePosition({ x: e.clientX, y: e.clientY })
          setShowOptions(true)
        }}
      >
        {children}
      </OpacityButton>
      {showOptions &&
        createPortal(
          <OptionsContainer x={mousePosition?.x} y={mousePosition?.y}>
            {options.map((option, i) => (
              <Fragment key={i}>
                {renderOption ? (
                  renderOption({
                    ...option,
                    onClick: () => {
                      setShowOptions(false)
                      option.onClick()
                    },
                  })
                ) : (
                  <OpacityButton
                    onClick={() => {
                      setShowOptions(false)
                      option.onClick()
                    }}
                  >
                    {option.title}
                  </OpacityButton>
                )}
              </Fragment>
            ))}
          </OptionsContainer>,
          document.querySelector('#modal-root'),
        )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  transform: scale(1);
`

const OptionsContainer = styled.div`
  ${({ theme: { colors, shadows }, x = 0, y = 0 }) => css`
    width: max-content;
    display: flex;
    z-index: 2;
    flex-direction: column;
    row-gap: 14px;
    position: fixed;
    top: ${y - 12}px;
    left: ${x + 12}px;
    transform: translateY(-100%);
    padding: 24px;
    background: ${colors.modalBackground};
    border: 1px solid ${colors.modalsInputBorder};
    box-shadow: ${shadows.modalShadow};
    border-radius: 8px;
  `}
`
