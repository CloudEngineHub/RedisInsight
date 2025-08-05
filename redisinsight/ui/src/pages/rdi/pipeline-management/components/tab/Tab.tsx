import React from 'react'
import cx from 'classnames'
import { RiText } from 'uiSrc/components/base/text'
import { RiLoader } from 'uiSrc/components/base/display'

import { RiIcon } from 'uiSrc/components/base/icons'
import styles from './styles.module.scss'

export interface IProps {
  title: string | JSX.Element
  isSelected: boolean
  className?: string
  fileName?: string
  children?: React.ReactElement | string
  testID?: string
  isLoading?: boolean
  isValid?: boolean
}

const Tab = (props: IProps) => {
  const {
    title,
    isSelected,
    children,
    fileName,
    testID,
    className,
    isLoading = false,
    isValid = true,
  } = props

  return (
    <div
      className={cx(styles.wrapper, className, { [styles.active]: isSelected })}
      data-testid={testID}
    >
      <RiText className="rdi-pipeline-nav__title" size="m">
        {title}
      </RiText>
      {fileName ? (
        <div className="rdi-pipeline-nav__file">
          <RiIcon type="ContractsIcon" className="rdi-pipeline-nav__fileIcon" />
          <RiText className={cx('rdi-pipeline-nav__text', { invalid: !isValid })}>
            {fileName}
          </RiText>

          {!isValid && (
            <RiIcon
              type="InfoIcon"
              className="rdi-pipeline-nav__error"
              data-testid="rdi-nav-config-error"
              color="danger500"
            />
          )}

          {isLoading && (
            <RiLoader
              data-testid="rdi-nav-config-loader"
              className={styles.loader}
            />
          )}
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  )
}

export default Tab
