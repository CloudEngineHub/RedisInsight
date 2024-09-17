import React, { useCallback, useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import { EuiResizableContainer } from '@elastic/eui'
import { useDispatch, useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'
import { appContextSearchAndQuery, setSQVerticalPanelSizes, } from 'uiSrc/slices/app/context'
import { QueryWrapper, ResultsHistory } from 'uiSrc/pages/search/components'

import { sendWbQueryAction, setExecutionType } from 'uiSrc/slices/workbench/wb-results'
import { formatLongName, getDbIndex, Nullable, setTitle } from 'uiSrc/utils'

import { connectedInstanceSelector } from 'uiSrc/slices/instances/instances'
import { sendPageViewTelemetry, TelemetryPageView } from 'uiSrc/telemetry'
import { CodeButtonParams } from 'uiSrc/constants'

import { CommandExecutionType } from 'uiSrc/slices/interfaces'
import { appRedisCommandsSelector } from 'uiSrc/slices/app/redis-commands'
import styles from './styles.module.scss'

const verticalPanelIds = {
  firstPanelId: 'scriptingArea',
  secondPanelId: 'resultsArea'
}

const SearchPage = () => {
  const { name: connectedInstanceName, db } = useSelector(connectedInstanceSelector)
  const { commandsArray } = useSelector(appRedisCommandsSelector)

  const { panelSizes: { vertical } } = useSelector(appContextSearchAndQuery)
  const [isPageViewSent, setIsPageViewSent] = useState(false)

  const { instanceId } = useParams<{ instanceId: string }>()
  const verticalSizesRef = useRef(vertical)

  const dispatch = useDispatch()

  setTitle(`${formatLongName(connectedInstanceName, 33, 0, '...')} ${getDbIndex(db)} - Search and Query`)

  useEffect(() => {
    dispatch(setExecutionType(CommandExecutionType.Search))
    return () => {
      dispatch(setSQVerticalPanelSizes(verticalSizesRef.current))
    }
  }, [])

  useEffect(() => {
    if (connectedInstanceName && !isPageViewSent) {
      sendPageView(instanceId)
    }
  }, [connectedInstanceName, isPageViewSent])

  const onVerticalPanelWidthChange = useCallback((newSizes: any) => {
    verticalSizesRef.current = newSizes
  }, [])

  const sendPageView = (instanceId: string) => {
    sendPageViewTelemetry({
      name: TelemetryPageView.SEARCH_AND_QUERY_PAGE,
      eventData: {
        databaseId: instanceId
      }
    })
    setIsPageViewSent(true)
  }

  const handleSubmit = (
    commandInit: string,
    commandId?: Nullable<string>,
    executeParams: CodeButtonParams = {}
  ) => {
    dispatch(sendWbQueryAction(
      commandInit,
      commandId,
      {
        ...executeParams,
        results: 'single',
      },
      CommandExecutionType.Search
    ))
  }

  return (
    <div className={cx('workbenchPage', styles.container)}>
      <div className={styles.main}>
        <div className={styles.content}>
          <EuiResizableContainer onPanelWidthChange={onVerticalPanelWidthChange} direction="vertical" style={{ height: '100%' }}>
            {(EuiResizablePanel, EuiResizableButton) => (
              <>
                <EuiResizablePanel
                  id={verticalPanelIds.firstPanelId}
                  minSize="140px"
                  paddingSize="none"
                  scrollable={false}
                  className={styles.queryPanel}
                  initialSize={vertical[verticalPanelIds.firstPanelId] ?? 20}
                  style={{ minHeight: '240px', zIndex: '8' }}
                >
                  <QueryWrapper commandsArray={commandsArray} onSubmit={handleSubmit} />
                </EuiResizablePanel>

                <EuiResizableButton
                  className={styles.resizeButton}
                  data-test-subj="resize-btn-scripting-area-and-results"
                />

                <EuiResizablePanel
                  id={verticalPanelIds.secondPanelId}
                  minSize="60px"
                  paddingSize="none"
                  scrollable={false}
                  initialSize={vertical[verticalPanelIds.secondPanelId] ?? 80}
                  className={cx(styles.queryResults, styles.queryResultsPanel)}
                  // Fix scroll on low height - 140px (queryPanel)
                  style={{ maxHeight: 'calc(100% - 240px)' }}
                >
                  <ResultsHistory commandsArray={commandsArray} onSubmit={handleSubmit} />
                </EuiResizablePanel>
              </>
            )}
          </EuiResizableContainer>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
