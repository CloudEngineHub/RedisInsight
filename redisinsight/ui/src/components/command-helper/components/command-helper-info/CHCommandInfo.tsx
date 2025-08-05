import React from 'react'

import { GroupBadge } from 'uiSrc/components'
import { CommandGroup } from 'uiSrc/constants'

import { RiIconButton } from 'uiSrc/components/base/forms'
import { ArrowLeftIcon } from 'uiSrc/components/base/icons'
import { RiColorText } from 'uiSrc/components/base/text'
import { RiBadge } from 'uiSrc/components/base/display'
import { RiRow } from 'uiSrc/components/base/layout'

import styles from './styles.module.scss'

export interface Props {
  args: string
  group: CommandGroup | string
  complexity: string
  onBackClick: () => void
}

const CHCommandInfo = (props: Props) => {
  const {
    args = '',
    group = CommandGroup.Generic,
    complexity = '',
    onBackClick,
  } = props

  return (
    <RiRow
      align="center"
      className={styles.container}
      data-testid="cli-helper-title"
    >
      <RiIconButton
        icon={ArrowLeftIcon}
        onClick={onBackClick}
        data-testid="cli-helper-back-to-list-btn"
        style={{ marginRight: '4px' }}
      />
      <GroupBadge type={group} className={styles.groupBadge} />
      <RiColorText
        className={styles.title}
        color="subdued"
        data-testid="cli-helper-title-args"
      >
        {args}
      </RiColorText>
      {complexity && (
        <RiBadge
          label={complexity}
          variant="light"
          className={styles.badge}
          data-testid="cli-helper-complexity-short"
        />
      )}
    </RiRow>
  )
}

export default CHCommandInfo
