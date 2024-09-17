import { Selector, t } from 'testcafe';
import { BaseRunCommandsPage } from './base-run-commands-page';

export class WorkbenchPage extends BaseRunCommandsPage {
    //CSS selectors
    cssSelectorPaginationButtonPrevious = '[data-test-subj=pagination-button-previous]';
    cssSelectorPaginationButtonNext = '[data-test-subj=pagination-button-next]';
    cssMonacoCommandPaletteLine = '[aria-label="Command Palette"]';
    cssWorkbenchCommandInHistory = '[data-testid=wb-command]';
    queryGraphContainer = '[data-testid=query-graph-container]';
    cssQueryCardCommand = '[data-testid=query-card-command]';
    cssRowInVirtualizedTable = '[data-testid^=row-]';
    cssClientListViewTypeOption = '[data-testid=view-type-selected-Plugin-client-list__clients-list]';
    //-------------------------------------------------------------------------------------------
    //DECLARATION OF SELECTORS
    //*Declare all elements/components of the relevant page.
    //*Target any element/component via data-id, if possible!
    //*The following categories are ordered alphabetically (Alerts, Buttons, Checkboxes, etc.).
    //-------------------------------------------------------------------------------------------
    //BUTTON
    resizeButtonForScriptingAndResults = Selector('[data-test-subj=resize-btn-scripting-area-and-results]');
    collapsePreselectAreaButton = Selector('[data-testid=collapse-enablement-area]');
    expandPreselectAreaButton = Selector('[data-testid=expand-enablement-area]');
    paginationButtonPrevious = Selector(this.cssSelectorPaginationButtonPrevious);
    paginationButtonNext = Selector(this.cssSelectorPaginationButtonNext);
    preselectIndexInformation = Selector('[data-testid="preselect-Additional index information"]');
    preselectExactSearch = Selector('[data-testid="preselect-Exact text search"]');
    preselectCreateHashIndex = Selector('[data-testid="preselect-Create a hash index"]');
    preselectGroupBy = Selector('[data-testid*=preselect-Group]');
    preselectButtons = Selector('[data-testid^=preselect-]');
    preselectManual = Selector('[data-testid=preselect-Manual]');
    queryCardNoModuleButton = Selector('[data-testid=query-card-no-module-button] a');
    closeEnablementPage = Selector('[data-testid=enablement-area__page-close]');
    groupMode = Selector('[data-testid=btn-change-group-mode]');

    //ICONS
    noCommandHistoryIcon = Selector('[data-testid=wb_no-results__icon]');
    groupModeIcon = Selector('[data-testid=group-mode-tooltip]');
    silentModeIcon = Selector('[data-testid=silent-mode-tooltip]');

    //TEXT ELEMENTS
    queryPluginResult = Selector('[data-testid=query-plugin-result]');
    responseInfo = Selector('[class="responseInfo"]');
    parsedRedisReply = Selector('[class="parsedRedisReply"]');
    mainEditorArea = Selector('[data-testid=main-input-container-area]');
    queryColumns = Selector('[data-testid*=query-column-]');
    noCommandHistorySection = Selector('[data-testid=wb_no-results]');
    noCommandHistoryTitle = Selector('[data-testid=wb_no-results__title]');
    noCommandHistoryText = Selector('[data-testid=wb_no-results__summary]');
    scrolledEnablementArea = Selector('[data-testid=enablement-area__page]');
    commandExecutionResult = Selector('[data-testid=welcome-page-title]');
    commandExecutionResultFailed = Selector('[data-testid=cli-output-response-fail]');
    chartViewTypeOptionSelected = Selector('[data-testid=view-type-selected-Plugin-redistimeseries__redistimeseries-chart]');
    scriptsLines = Selector('[data-testid=query-input-container] .view-lines');
    queryJsonResult = Selector('[data-testid=json-view]');
    jsonStringViewTypeOption = Selector('[data-test-subj=view-type-option-Plugin-client-list__json-string-view]');

    graphViewTypeOption = Selector('[data-test-subj^=view-type-option-Plugin-graph]');
    typeSelectedClientsList = Selector('[data-testid=view-type-selected-Plugin-client-list__clients-list]');
    viewTypeOptionClientList = Selector('[data-test-subj=view-type-option-Plugin-client-list__clients-list]');
    viewTypeOptionsText = Selector('[data-test-subj=view-type-option-Text-default__Text]');

    // Select view option in Workbench results
    async selectViewTypeGraph(): Promise<void> {
        await t
            .click(this.selectViewType)
            .click(this.graphViewTypeOption);
    }

    /**
     * Send multiple commands in Workbench
     * @param commands The commands
     */
    async sendMultipleCommandsInWorkbench(commands: string[]): Promise<void> {
        for (const command of commands) {
            await t
                .typeText(this.queryInput, command, { replace: false, speed: 1, paste: true })
                .pressKey('enter');
        }
        await t.click(this.submitCommandButton);
    }

    /**
     * Send commands array in Workbench page
     * @param commands The array of commands to send
     */
    async sendCommandsArrayInWorkbench(commands: string[]): Promise<void> {
        for (const command of commands) {
            await this.sendCommandInWorkbench(command);
        }
    }

    /**
     * Get internal tutorial link with .md name
     * @param internalLink name of the .md file
     */
    getInternalLinkWithManifest(internalLink: string): Selector {
        return Selector(`[data-testid="internal-link-${internalLink}.md"]`);
    }

    /**
     * Get internal tutorial link without .md name
     * @param internalLink name of the label
     */
    getInternalLinkWithoutManifest(internalLink: string): Selector {
        return Selector(`[data-testid="internal-link-${internalLink}"]`);
    }

    // Select Json view option in Workbench results
    async selectViewTypeJson(): Promise<void> {
        await t
            .click(this.selectViewType)
            .click(this.jsonStringViewTypeOption);
    }
}
