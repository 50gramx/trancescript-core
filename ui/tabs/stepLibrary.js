// lib/stepLibrary.js
export const stepLibrary = [
    // Navigation & Access
    {
        id: "access-page",
        type: "Given",
        label: "Access Page",
        template: "The user accesses {page}",
        params: [
            { name: "page", type: "page", required: true, description: "Target page to access" }
        ],
        category: "Navigation"
    },
    {
        id: "navigate-to",
        type: "When",
        label: "Navigate To",
        template: "They navigate to {page}",
        params: [
            { name: "page", type: "page", required: true, description: "Destination page" }
        ],
        category: "Navigation"
    },
    {
        id: "return-to",
        type: "When",
        label: "Return To",
        template: "They return to {page}",
        params: [
            { name: "page", type: "page", required: true, description: "Previous page to return to" }
        ],
        category: "Navigation"
    },

    // Authentication & Authorization
    {
        id: "user-logged-in",
        type: "Given",
        label: "User Logged In",
        template: "The user is logged in as {user-role}",
        params: [
            { name: "user-role", type: "string", required: true, description: "User role or type" }
        ],
        category: "Authentication"
    },
    {
        id: "user-not-logged-in",
        type: "Given",
        label: "User Not Logged In",
        template: "The user is not logged in",
        params: [],
        category: "Authentication"
    },
    {
        id: "login",
        type: "When",
        label: "Login",
        template: "They log in with {credentials}",
        params: [
            { name: "credentials", type: "string", required: true, description: "Login credentials type" }
        ],
        category: "Authentication"
    },
    {
        id: "logout",
        type: "When",
        label: "Logout",
        template: "They log out from the application",
        params: [],
        category: "Authentication"
    },

    // Data Entry & Forms
    {
        id: "enter-text",
        type: "When",
        label: "Enter Text",
        template: "They enter {text-value} in {field-name}",
        params: [
            { name: "text-value", type: "string", required: true, description: "Text to enter" },
            { name: "field-name", type: "string", required: true, description: "Field name or label" }
        ],
        category: "Data Entry"
    },
    {
        id: "select-option",
        type: "When",
        label: "Select Option",
        template: "They select {option-value} from {dropdown-name}",
        params: [
            { name: "option-value", type: "string", required: true, description: "Option to select" },
            { name: "dropdown-name", type: "string", required: true, description: "Dropdown or select field name" }
        ],
        category: "Data Entry"
    },
    {
        id: "check-box",
        type: "When",
        label: "Check Box",
        template: "They check the {checkbox-name} checkbox",
        params: [
            { name: "checkbox-name", type: "string", required: true, description: "Checkbox label or name" }
        ],
        category: "Data Entry"
    },
    {
        id: "uncheck-box",
        type: "When",
        label: "Uncheck Box",
        template: "They uncheck the {checkbox-name} checkbox",
        params: [
            { name: "checkbox-name", type: "string", required: true, description: "Checkbox label or name" }
        ],
        category: "Data Entry"
    },
    {
        id: "upload-file",
        type: "When",
        label: "Upload File",
        template: "They upload a {file-type} file named {file-name}",
        params: [
            { name: "file-type", type: "string", required: true, description: "Type of file to upload" },
            { name: "file-name", type: "string", required: true, description: "Name of the file" }
        ],
        category: "Data Entry"
    },

    // Actions & Interactions
    {
        id: "click-button",
        type: "When",
        label: "Click Button",
        template: "They click the {button-text} button",
        params: [
            { name: "button-text", type: "string", required: true, description: "Button text or label" }
        ],
        category: "Actions"
    },
    {
        id: "click-link",
        type: "When",
        label: "Click Link",
        template: "They click the {link-text} link",
        params: [
            { name: "link-text", type: "string", required: true, description: "Link text or label" }
        ],
        category: "Actions"
    },
    {
        id: "submit-form",
        type: "When",
        label: "Submit Form",
        template: "They submit the {form-name} form",
        params: [
            { name: "form-name", type: "string", required: true, description: "Form name or purpose" }
        ],
        category: "Actions"
    },
    {
        id: "save-data",
        type: "When",
        label: "Save Data",
        template: "They save the {data-type} data",
        params: [
            { name: "data-type", type: "string", required: true, description: "Type of data being saved" }
        ],
        category: "Actions"
    },
    {
        id: "delete-item",
        type: "When",
        label: "Delete Item",
        template: "They delete the {item-name}",
        params: [
            { name: "item-name", type: "string", required: true, description: "Name of item to delete" }
        ],
        category: "Actions"
    },

    // Search & Filter
    {
        id: "search-for",
        type: "When",
        label: "Search For",
        template: "They search for {search-term}",
        params: [
            { name: "search-term", type: "string", required: true, description: "Search term or query" }
        ],
        category: "Search"
    },
    {
        id: "apply-filter",
        type: "When",
        label: "Apply Filter",
        template: "They apply {filter-type} filter with value {filter-value}",
        params: [
            { name: "filter-type", type: "string", required: true, description: "Type of filter" },
            { name: "filter-value", type: "string", required: true, description: "Filter value" }
        ],
        category: "Search"
    },
    {
        id: "clear-filters",
        type: "When",
        label: "Clear Filters",
        template: "They clear all applied filters",
        params: [],
        category: "Search"
    },

    // Data Display & Viewing
    {
        id: "view-list",
        type: "When",
        label: "View List",
        template: "They view the list of {item-type}",
        params: [
            { name: "item-type", type: "string", required: true, description: "Type of items in the list" }
        ],
        category: "Viewing"
    },
    {
        id: "view-details",
        type: "When",
        label: "View Details",
        template: "They view details of {item-name}",
        params: [
            { name: "item-name", type: "string", required: true, description: "Name of item to view" }
        ],
        category: "Viewing"
    },
    {
        id: "open-modal",
        type: "When",
        label: "Open Modal",
        template: "They open the {modal-name} modal",
        params: [
            { name: "modal-name", type: "string", required: true, description: "Name or purpose of modal" }
        ],
        category: "Viewing"
    },
    {
        id: "close-modal",
        type: "When",
        label: "Close Modal",
        template: "They close the {modal-name} modal",
        params: [
            { name: "modal-name", type: "string", required: true, description: "Name of modal to close" }
        ],
        category: "Viewing"
    },

    // Validation & Verification
    {
        id: "verify-content",
        type: "Then",
        label: "Verify Content",
        template: "They should see {expected-content}",
        params: [
            { name: "expected-content", type: "string", required: true, description: "Content that should be visible" }
        ],
        category: "Verification"
    },
    {
        id: "verify-message",
        type: "Then",
        label: "Verify Message",
        template: "They should see a {message-type} message saying {message-text}",
        params: [
            { name: "message-type", type: "string", required: true, description: "Type of message (success, error, warning)" },
            { name: "message-text", type: "string", required: true, description: "Expected message text" }
        ],
        category: "Verification"
    },
    {
        id: "verify-redirect",
        type: "Then",
        label: "Verify Redirect",
        template: "They should be redirected to {page}",
        params: [
            { name: "page", type: "page", required: true, description: "Expected destination page" }
        ],
        category: "Verification"
    },
    {
        id: "verify-count",
        type: "Then",
        label: "Verify Count",
        template: "They should see {expected-count} {item-type}",
        params: [
            { name: "expected-count", type: "number", required: true, description: "Expected number of items" },
            { name: "item-type", type: "string", required: true, description: "Type of items to count" }
        ],
        category: "Verification"
    },

    // State & Conditions
    {
        id: "item-exists",
        type: "Given",
        label: "Item Exists",
        template: "A {item-type} named {item-name} exists",
        params: [
            { name: "item-type", type: "string", required: true, description: "Type of item" },
            { name: "item-name", type: "string", required: true, description: "Name of the item" }
        ],
        category: "State"
    },
    {
        id: "item-not-exists",
        type: "Given",
        label: "Item Not Exists",
        template: "No {item-type} named {item-name} exists",
        params: [
            { name: "item-type", type: "string", required: true, description: "Type of item" },
            { name: "item-name", type: "string", required: true, description: "Name of the item" }
        ],
        category: "State"
    },
    {
        id: "system-condition",
        type: "Given",
        label: "System Condition",
        template: "The system is in {condition-state} state",
        params: [
            { name: "condition-state", type: "string", required: true, description: "System state or condition" }
        ],
        category: "State"
    },

    // Advanced Interactions
    {
        id: "drag-drop",
        type: "When",
        label: "Drag and Drop",
        template: "They drag {source-item} and drop it on {target-item}",
        params: [
            { name: "source-item", type: "string", required: true, description: "Item being dragged" },
            { name: "target-item", type: "string", required: true, description: "Drop target" }
        ],
        category: "Advanced"
    },
    {
        id: "scroll-to",
        type: "When",
        label: "Scroll To",
        template: "They scroll to {scroll-target}",
        params: [
            { name: "scroll-target", type: "string", required: true, description: "Target to scroll to" }
        ],
        category: "Advanced"
    },
    {
        id: "refresh-page",
        type: "When",
        label: "Refresh Page",
        template: "They refresh the current page",
        params: [],
        category: "Advanced"
    },
    {
        id: "wait-for",
        type: "When",
        label: "Wait For",
        template: "They wait for {wait-condition} to complete",
        params: [
            { name: "wait-condition", type: "string", required: true, description: "Condition to wait for" }
        ],
        category: "Advanced"
    },

    // Healthcare - Storage
    {
        id: "access-storage",
        type: "Given",
        label: "Access Storage",
        template: "The user accesses the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "The storage page to access" }
        ],
        category: "Healthcare"
    },
    {
        id: "upload-medical-file",
        type: "When",
        label: "Upload Medical File",
        template: "They upload a {file-type} file named {filename} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for file upload" },
            { name: "file-type", type: "string", required: true, description: "Type of medical file" },
            { name: "filename", type: "string", required: true, description: "Name of the file" }
        ],
        category: "Healthcare"
    },
    {
        id: "verify-versioning",
        type: "Then",
        label: "Verify Versioning",
        template: "They verify that {feature} is enabled on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to check" },
            { name: "feature", type: "string", required: true, description: "Feature to verify (e.g., versioning)" }
        ],
        category: "Healthcare"
    },
    {
        id: "test-s3-api",
        type: "Then",
        label: "Test S3 API",
        template: "They test the {api-type} API on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for API test" },
            { name: "api-type", type: "string", required: true, description: "API type to test" }
        ],
        category: "Healthcare"
    },
    {
        id: "verify-encryption",
        type: "Then",
        label: "Verify Encryption",
        template: "They verify that {encryption} encryption is active on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to check" },
            { name: "encryption", type: "string", required: true, description: "Type of encryption" }
        ],
        category: "Healthcare"
    },
    {
        id: "access-storage-config",
        type: "Given",
        label: "Access Storage Config",
        template: "The user accesses the storage configuration on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "The page with storage configuration" }
        ],
        category: "Healthcare"
    },
    {
        id: "enable-erasure-coding",
        type: "When",
        label: "Enable Erasure Coding",
        template: "They enable the {feature} feature on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to enable the feature" },
            { name: "feature", type: "string", required: true, description: "Feature to enable" }
        ],
        category: "Healthcare"
    },
    {
        id: "upload-large-dataset",
        type: "When",
        label: "Upload Large Dataset",
        template: "They upload a dataset of {dataset-size} size on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for upload" },
            { name: "dataset-size", type: "string", required: true, description: "Size of the dataset" }
        ],
        category: "Healthcare"
    },
    {
        id: "verify-data-distribution",
        type: "Then",
        label: "Verify Data Distribution",
        template: "They verify the {verification} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for verification" },
            { name: "verification", type: "string", required: true, description: "Type of verification" }
        ],
        category: "Healthcare"
    },
    {
        id: "test-node-failure",
        type: "Then",
        label: "Test Node Failure",
        template: "They run a {test} test on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for the test" },
            { name: "test", type: "string", required: true, description: "Type of failure test" }
        ],
        category: "Healthcare"
    },

    // Healthcare - Monitoring & Recovery
    {
        id: "access-monitoring",
        type: "Given",
        label: "Access Monitoring",
        template: "The user accesses the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "The monitoring page to access" }
        ],
        category: "Healthcare"
    },
    {
        id: "view-performance-metrics",
        type: "When",
        label: "View Performance Metrics",
        template: "They view {metrics} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to view metrics" },
            { name: "metrics", type: "string", required: true, description: "Specific metrics to view" }
        ],
        category: "Healthcare"
    },
    {
        id: "monitor-resource-utilization",
        type: "When",
        label: "Monitor Resource Utilization",
        template: "They monitor {resources} utilization on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for monitoring" },
            { name: "resources", type: "string", required: true, description: "Resources to monitor" }
        ],
        category: "Healthcare"
    },
    {
        id: "review-optimization-recommendations",
        type: "When",
        label: "Review Optimization Recommendations",
        template: "They review {recommendations} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to review recommendations" },
            { name: "recommendations", type: "string", required: true, description: "Type of recommendations" }
        ],
        category: "Healthcare"
    },
    {
        id: "access-recovery",
        type: "Given",
        label: "Access Recovery",
        template: "The user accesses the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "The recovery page to access" }
        ],
        category: "Healthcare"
    },
    {
        id: "enable-disaster-recovery",
        type: "When",
        label: "Enable Disaster Recovery",
        template: "They enable the {feature} feature on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to enable the feature" },
            { name: "feature", type: "string", required: true, description: "Feature to enable" }
        ],
        category: "Healthcare"
    },
    {
        id: "test-failover-scenario",
        type: "When",
        label: "Test Failover Scenario",
        template: "They test a scenario where {test} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for the test" },
            { name: "test", type: "string", required: true, description: "Failover test scenario" }
        ],
        category: "Healthcare"
    },
    {
        id: "verify-data-accessibility",
        type: "Then",
        label: "Verify Data Accessibility",
        template: "They verify {verification} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for verification" },
            { name: "verification", type: "string", required: true, description: "Type of accessibility verification" }
        ],
        category: "Healthcare"
    },
    {
        id: "configure-backup-schedule",
        type: "When",
        label: "Configure Backup Schedule",
        template: "They configure a {schedule} backup on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to configure schedule" },
            { name: "schedule", type: "string", required: true, description: "The backup schedule" }
        ],
        category: "Healthcare"
    },
    {
        id: "test-failover",
        type: "When",
        label: "Test Failover",
        template: "They run a {test} test on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for the test" },
            { name: "test", type: "string", required: true, description: "The failover test to run" }
        ],
        category: "Healthcare"
    },
    {
        id: "verify-data-recovery",
        type: "Then",
        label: "Verify Data Recovery",
        template: "They verify {verification} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for verification" },
            { name: "verification", type: "string", required: true, description: "The data integrity to verify" }
        ],
        category: "Healthcare"
    },

    // Healthcare - IPFS & Backup
    {
        id: "access-backup",
        type: "Given",
        label: "Access Backup",
        template: "The user accesses the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "The backup page to access" }
        ],
        category: "Healthcare"
    },
    {
        id: "enable-ipfs-backup",
        type: "When",
        label: "Enable IPFS Backup",
        template: "They enable the {feature} feature on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to enable backup" },
            { name: "feature", type: "string", required: true, description: "The backup feature to enable" }
        ],
        category: "Healthcare"
    },
    {
        id: "upload-file-to-minio",
        type: "When",
        label: "Upload File to MinIO",
        template: "They trigger a {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "The page to trigger the action" },
            { name: "action", type: "string", required: true, description: "The action to trigger" }
        ],
        category: "Healthcare"
    },
    {
        id: "verify-backup-completion",
        type: "Then",
        label: "Verify Backup Completion",
        template: "They verify {verification} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for verification" },
            { name: "verification", type: "string", required: true, description: "The backup status to verify" }
        ],
        category: "Healthcare"
    },
    {
        id: "generate-cid",
        type: "Then",
        label: "Generate CID",
        template: "The system should generate a {output}",
        params: [
            { name: "page", type: "page", required: true, description: "Page where CID is generated" },
            { name: "output", type: "string", required: true, description: "The expected output" }
        ],
        category: "Healthcare"
    },
    {
        id: "access-ipfs",
        type: "Given",
        label: "Access IPFS",
        template: "The user accesses the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "The IPFS page to access" }
        ],
        category: "Healthcare"
    },
    {
        id: "configure-cluster",
        type: "When",
        label: "Configure Cluster",
        template: "They configure the {feature} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for configuration" },
            { name: "feature", type: "string", required: true, description: "The cluster feature to configure" }
        ],
        category: "Healthcare"
    },
    {
        id: "upload-backup-data",
        type: "When",
        label: "Upload Backup Data",
        template: "They upload {data-type} to the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for upload" },
            { name: "data-type", type: "string", required: true, description: "Type of data to upload" }
        ],
        category: "Healthcare"
    },
    {
        id: "verify-content-addressing",
        type: "Then",
        label: "Verify Content Addressing",
        template: "They verify the {feature} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for verification" },
            { name: "feature", type: "string", required: true, description: "The feature to verify" }
        ],
        category: "Healthcare"
    },
    {
        id: "test-data-retrieval",
        type: "Then",
        label: "Test Data Retrieval",
        template: "They run a {test} test on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for the test" },
            { name: "test", type: "string", required: true, description: "The retrieval test to run" }
        ],
        category: "Healthcare"
    },

    // Healthcare - Compliance
    {
        id: "access-compliance",
        type: "Given",
        label: "Access Compliance",
        template: "The user accesses the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "The compliance page to access" }
        ],
        category: "Healthcare"
    },
    {
        id: "enable-integrity-audits",
        type: "When",
        label: "Enable Integrity Audits",
        template: "They enable {feature} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to enable feature" },
            { name: "feature", type: "string", required: true, description: "The audit feature to enable" }
        ],
        category: "Healthcare"
    },
    {
        id: "run-scheduled-audit",
        type: "When",
        label: "Run Scheduled Audit",
        template: "They run a {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for the action" },
            { name: "action", type: "string", required: true, description: "The audit action to run" }
        ],
        category: "Healthcare"
    },
    {
        id: "verify-files-against-cids",
        type: "Then",
        label: "Verify Files Against CIDs",
        template: "They perform a {verification} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for verification" },
            { name: "verification", type: "string", required: true, description: "The verification to perform" }
        ],
        category: "Healthcare"
    },
    {
        id: "generate-compliance-report",
        type: "Then",
        label: "Generate Compliance Report",
        template: "The system should generate a {output} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for report generation" },
            { name: "output", type: "string", required: true, description: "The type of report to generate" }
        ],
        category: "Healthcare"
    },
    {
        id: "access-compliance-dashboard",
        type: "Given",
        label: "Access Compliance Dashboard",
        template: "The user accesses the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "The compliance dashboard page" }
        ],
        category: "Healthcare"
    },
    {
        id: "enable-compliance-monitoring",
        type: "When",
        label: "Enable Compliance Monitoring",
        template: "They enable the {feature} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to enable monitoring" },
            { name: "feature", type: "string", required: true, description: "The monitoring feature" }
        ],
        category: "Healthcare"
    },
    {
        id: "verify-encryption-status",
        type: "Then",
        label: "Verify Encryption Status",
        template: "They verify the {verification} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for verification" },
            { name: "verification", type: "string", required: true, description: "The encryption status" }
        ],
        category: "Healthcare"
    },
    {
        id: "check-access-logs",
        type: "Then",
        label: "Check Access Logs",
        template: "They check for {check} in the access logs on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to check logs" },
            { name: "check", type: "string", required: true, description: "What to check for in the logs" }
        ],
        category: "Healthcare"
    },
    {
        id: "view-current-compliance-status",
        type: "When",
        label: "View Current Compliance Status",
        template: "They view the {view} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to view status" },
            { name: "view", type: "string", required: true, description: "The status view" }
        ],
        category: "Healthcare"
    },
    {
        id: "review-compliance-events",
        type: "When",
        label: "Review Compliance Events",
        template: "They review {view} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to review events" },
            { name: "view", type: "string", required: true, description: "The events view" }
        ],
        category: "Healthcare"
    },
    {
        id: "access-detailed-reports",
        type: "When",
        label: "Access Detailed Reports",
        template: "They access {view} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to access reports" },
            { name: "view", type: "string", required: true, description: "The detailed reports view" }
        ],
        category: "Healthcare"
    },
    {
        id: "review-detection-results",
        type: "When",
        label: "Review Detection Results",
        template: "They {review} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for review" },
            { name: "review", type: "string", required: true, description: "The results to review" }
        ],
        category: "Healthcare"
    },
    {
        id: "apply-data-masking",
        type: "When",
        label: "Apply Data Masking",
        template: "They apply the {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to apply action" },
            { name: "action", type: "string", required: true, description: "The masking action" }
        ],
        category: "Healthcare"
    },
    {
        id: "review-audit-trail",
        type: "When",
        label: "Review Audit Trail",
        template: "They {review} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for review" },
            { name: "review", type: "string", required: true, description: "The trail to review" }
        ],
        category: "Healthcare"
    },
    {
        id: "export-compliance-data",
        type: "When",
        label: "Export Compliance Data",
        template: "They {export} from the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for export" },
            { name: "export", type: "string", required: true, description: "The data to export" }
        ],
        category: "Healthcare"
    },
    {
        id: "schedule-automated-reports",
        type: "When",
        label: "Schedule Automated Reports",
        template: "They schedule {schedule} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for scheduling" },
            { name: "schedule", type: "string", required: true, description: "The reports to schedule" }
        ],
        category: "Healthcare"
    },
    {
        id: "review-audit-logs",
        type: "When",
        label: "Review Audit Logs",
        template: "They {review} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for review" },
            { name: "review", type: "string", required: true, description: "The logs to review" }
        ],
        category: "Healthcare"
    },

    // Healthcare - AI & Search
    {
        id: "access-search",
        type: "Given",
        label: "Access Search",
        template: "The user accesses the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "The search page to access" }
        ],
        category: "Healthcare"
    },
    {
        id: "enable-semantic-search",
        type: "When",
        label: "Enable Semantic Search",
        template: "They enable the {feature} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to enable feature" },
            { name: "feature", type: "string", required: true, description: "The search feature" }
        ],
        category: "Healthcare"
    },
    {
        id: "perform-natural-language-search",
        type: "When",
        label: "Perform Natural Language Search",
        template: "They perform a search for '{query}' on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for searching" },
            { name: "query", type: "string", required: true, description: "The natural language query" }
        ],
        category: "Healthcare"
    },
    {
        id: "review-ranked-results",
        type: "Then",
        label: "Review Ranked Results",
        template: "They review the {results} results on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to review results" },
            { name: "results", type: "string", required: true, description: "The type of ranked results" }
        ],
        category: "Healthcare"
    },
    {
        id: "access-result-context",
        type: "When",
        label: "Access Result Context",
        template: "They access the {context} for a result on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to access context" },
            { name: "context", type: "string", required: true, description: "The context to access" }
        ],
        category: "Healthcare"
    },
    {
        id: "access-ai-management",
        type: "Given",
        label: "Access AI Management",
        template: "The user accesses the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "The AI management page" }
        ],
        category: "Healthcare"
    },
    {
        id: "enable-ocr-nlp",
        type: "When",
        label: "Enable OCR and NLP",
        template: "They enable {features} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to enable features" },
            { name: "features", type: "string", required: true, description: "The features to enable" }
        ],
        category: "Healthcare"
    },
    {
        id: "upload-scanned-document",
        type: "When",
        label: "Upload Scanned Document",
        template: "They upload a {document-type} document on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for upload" },
            { name: "document-type", type: "string", required: true, description: "Type of document to upload" }
        ],
        category: "Healthcare"
    },
    {
        id: "extract-text-content",
        type: "Then",
        label: "Extract Text Content",
        template: "The system performs {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The extraction action" }
        ],
        category: "Healthcare"
    },
    {
        id: "generate-structured-metadata",
        type: "Then",
        label: "Generate Structured Metadata",
        template: "The system generates {output} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for generation" },
            { name: "output", type: "string", required: true, description: "The metadata to generate" }
        ],
        category: "Healthcare"
    },
    {
        id: "enable-phi-detection",
        type: "When",
        label: "Enable PHI Detection",
        template: "They enable the {feature} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to enable feature" },
            { name: "feature", type: "string", required: true, description: "The detection feature" }
        ],
        category: "Healthcare"
    },
    {
        id: "upload-medical-document",
        type: "When",
        label: "Upload Medical Document",
        template: "They upload a {document-type} document on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for upload" },
            { name: "document-type", type: "string", required: true, description: "Type of document" }
        ],
        category: "Healthcare"
    },
    {
        id: "scan-for-phi-pii",
        type: "When",
        label: "Scan for PHI/PII",
        template: "They initiate a {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The scanning action" }
        ],
        category: "Healthcare"
    },
    {
        id: "tag-sensitivity-levels",
        type: "Then",
        label: "Tag Sensitivity Levels",
        template: "The system applies {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The tagging action" }
        ],
        category: "Healthcare"
    },
    {
        id: "enable-data-masking",
        type: "When",
        label: "Enable Data Masking",
        template: "They enable the {feature} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to enable feature" },
            { name: "feature", type: "string", required: true, description: "The masking feature" }
        ],
        category: "Healthcare"
    },
    {
        id: "access-dev-environment",
        type: "Given",
        label: "Access Dev Environment",
        template: "The user accesses the {environment} environment on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to access" },
            { name: "environment", type: "string", required: true, description: "The environment to access" }
        ],
        category: "Healthcare"
    },
    {
        id: "verify-phi-masking",
        type: "Then",
        label: "Verify PHI Masking",
        template: "They verify {verification} is active on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for verification" },
            { name: "verification", type: "string", required: true, description: "The masking verification" }
        ],
        category: "Healthcare"
    },
    {
        id: "preserve-original-data",
        type: "Then",
        label: "Preserve Original Data",
        template: "The system ensures {action} in the production environment",
        params: [
            { name: "page", type: "page", required: true, description: "Page where action occurs" },
            { name: "action", type: "string", required: true, description: "The preservation action" }
        ],
        category: "Healthcare"
    },
    {
        id: "access-security",
        type: "Given",
        label: "Access Security",
        template: "The user accesses the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "The security page to access" }
        ],
        category: "Healthcare"
    },
    {
        id: "enable-smart-policies",
        type: "When",
        label: "Enable Smart Policies",
        template: "They enable the {feature} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to enable feature" },
            { name: "feature", type: "string", required: true, description: "The policy feature" }
        ],
        category: "Healthcare"
    },
    {
        id: "analyze-access-patterns",
        type: "When",
        label: "Analyze Access Patterns",
        template: "They run a {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for analysis" },
            { name: "action", type: "string", required: true, description: "The analysis action" }
        ],
        category: "Healthcare"
    },
    {
        id: "identify-unusual-patterns",
        type: "Then",
        label: "Identify Unusual Patterns",
        template: "The system performs {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The detection action" }
        ],
        category: "Healthcare"
    },
    {
        id: "recommend-iam-policies",
        type: "Then",
        label: "Recommend IAM Policies",
        template: "The system provides a {output} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for recommendation" },
            { name: "output", type: "string", required: true, description: "The recommended output" }
        ],
        category: "Healthcare"
    },
    {
        id: "access-optimization",
        type: "Given",
        label: "Access Optimization",
        template: "The user accesses the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "The optimization page" }
        ],
        category: "Healthcare"
    },
    {
        id: "enable-lifecycle-management",
        type: "When",
        label: "Enable Lifecycle Management",
        template: "They enable {feature} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to enable feature" },
            { name: "feature", type: "string", required: true, description: "The management feature" }
        ],
        category: "Healthcare"
    },
    {
        id: "predict-rarely-accessed-data",
        type: "When",
        label: "Predict Rarely Accessed Data",
        template: "The system performs {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The prediction action" }
        ],
        category: "Healthcare"
    },
    {
        id: "move-to-cost-effective-tiers",
        type: "Then",
        label: "Move to Cost-Effective Tiers",
        template: "The system performs {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The tiering action" }
        ],
        category: "Healthcare"
    },
    {
        id: "enable-duplicate-detection",
        type: "When",
        label: "Enable Duplicate Detection",
        template: "They enable the {feature} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page to enable feature" },
            { name: "feature", type: "string", required: true, description: "The detection feature" }
        ],
        category: "Healthcare"
    },
    {
        id: "upload-new-medical-file",
        type: "When",
        label: "Upload New Medical File",
        template: "They trigger a {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The upload action" }
        ],
        category: "Healthcare"
    },
    {
        id: "check-for-duplicates",
        type: "When",
        label: "Check for Duplicates",
        template: "The system performs a {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The duplicate check action" }
        ],
        category: "Healthcare"
    },
    {
        id: "alert-duplicate-files",
        type: "Then",
        label: "Alert Duplicate Files",
        template: "The system triggers a {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The alert action" }
        ],
        category: "Healthcare"
    },
    {
        id: "access-ai-utilities",
        type: "Given",
        label: "Access AI Utilities",
        template: "The user accesses the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "The AI utilities page" }
        ],
        category: "Healthcare"
    },
    {
        id: "deploy-ai-models",
        type: "When",
        label: "Deploy AI Models",
        template: "They trigger {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The deployment action" }
        ],
        category: "Healthcare"
    },
    {
        id: "upload-medical-image",
        type: "When",
        label: "Upload Medical Image",
        template: "They trigger an {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The image upload action" }
        ],
        category: "Healthcare"
    },
    {
        id: "analyze-image-automatically",
        type: "When",
        label: "Analyze Image Automatically",
        template: "The system performs {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The analysis action" }
        ],
        category: "Healthcare"
    },
    {
        id: "detect-anomalies",
        type: "Then",
        label: "Detect Anomalies",
        template: "The system performs {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The anomaly detection action" }
        ],
        category: "Healthcare"
    },
    {
        id: "enable-metadata-enrichment",
        type: "When",
        label: "Enable Metadata Enrichment",
        template: "They enable the {feature} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for feature" },
            { name: "feature", type: "string", required: true, description: "The enrichment feature" }
        ],
        category: "Healthcare"
    },
    {
        id: "analyze-content",
        type: "When",
        label: "Analyze Content",
        template: "The system performs {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The content analysis action" }
        ],
        category: "Healthcare"
    },
    {
        id: "generate-metadata-tags",
        type: "Then",
        label: "Generate Metadata Tags",
        template: "The system generates {output} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for output" },
            { name: "output", type: "string", required: true, description: "The metadata tags" }
        ],
        category: "Healthcare"
    },
    {
        id: "upload-document",
        type: "When",
        label: "Upload Document",
        template: "They upload a {document} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for upload" },
            { name: "document", type: "string", required: true, description: "The document to upload" }
        ],
        category: "Healthcare"
    },
    {
        id: "access-access-control",
        type: "Given",
        label: "Access Access Control",
        template: "The user accesses the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "The access control page" }
        ],
        category: "Healthcare"
    },
    {
        id: "create-access-policy",
        type: "When",
        label: "Create Access Policy",
        template: "They perform the {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The policy creation action" }
        ],
        category: "Healthcare"
    },
    {
        id: "define-user-roles",
        type: "When",
        label: "Define User Roles",
        template: "They define {roles} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for definition" },
            { name: "roles", type: "string", required: true, description: "The user roles to define" }
        ],
        category: "Healthcare"
    },
    {
        id: "set-permission-levels",
        type: "When",
        label: "Set Permission Levels",
        template: "They set {permissions} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for setting permissions" },
            { name: "permissions", type: "string", required: true, description: "The permission levels" }
        ],
        category: "Healthcare"
    },
    {
        id: "test-policy-enforcement",
        type: "Then",
        label: "Test Policy Enforcement",
        template: "They run a {test} test on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for test" },
            { name: "test", type: "string", required: true, description: "The enforcement test" }
        ],
        category: "Healthcare"
    },
    {
        id: "perform-semantic-search",
        type: "When",
        label: "Perform Semantic Search",
        template: "They perform a {search-type} search on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for search" },
            { name: "search-type", type: "string", required: true, description: "The type of search" }
        ],
        category: "Healthcare"
    },
    {
        id: "review-search-results",
        type: "Then",
        label: "Review Search Results",
        template: "They {review} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for review" },
            { name: "review", type: "string", required: true, description: "The results to review" }
        ],
        category: "Healthcare"
    },
    {
        id: "access-document",
        type: "When",
        label: "Access Document",
        template: "They perform an {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The document access action" }
        ],
        category: "Healthcare"
    },
    {
        id: "access-document-processing",
        type: "Given",
        label: "Access Document Processing",
        template: "The user accesses the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "The document processing page" }
        ],
        category: "Healthcare"
    },
    {
        id: "process-ocr",
        type: "When",
        label: "Process OCR",
        template: "They run the {process} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for process" },
            { name: "process", type: "string", required: true, description: "The OCR process" }
        ],
        category: "Healthcare"
    },
    {
        id: "apply-nlp",
        type: "When",
        label: "Apply NLP",
        template: "They run the {process} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for process" },
            { name: "process", type: "string", required: true, description: "The NLP process" }
        ],
        category: "Healthcare"
    },
    {
        id: "review-extracted-text",
        type: "Then",
        label: "Review Extracted Text",
        template: "They {review} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for review" },
            { name: "review", type: "string", required: true, description: "The text to review" }
        ],
        category: "Healthcare"
    },
    {
        id: "analyze-data-patterns",
        type: "When",
        label: "Analyze Data Patterns",
        template: "They run an {analysis} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for analysis" },
            { name: "analysis", type: "string", required: true, description: "The pattern analysis" }
        ],
        category: "Healthcare"
    },
    {
        id: "predict-lifecycle",
        type: "When",
        label: "Predict Lifecycle",
        template: "They run a {prediction} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for prediction" },
            { name: "prediction", type: "string", required: true, description: "The lifecycle prediction" }
        ],
        category: "Healthcare"
    },
    {
        id: "apply-tiering-policy",
        type: "Then",
        label: "Apply Tiering Policy",
        template: "They apply an {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The tiering action" }
        ],
        category: "Healthcare"
    },
    {
        id: "monitor-optimization",
        type: "Then",
        label: "Monitor Optimization",
        template: "They {monitor} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for monitoring" },
            { name: "monitor", type: "string", required: true, description: "The optimization results to monitor" }
        ],
        category: "Healthcare"
    },
    {
        id: "access-duplicate-detection",
        type: "Given",
        label: "Access Duplicate Detection",
        template: "The user accesses the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "The duplicate detection page" }
        ],
        category: "Healthcare"
    },
    {
        id: "scan-storage",
        type: "When",
        label: "Scan Storage",
        template: "They perform a {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The storage scan action" }
        ],
        category: "Healthcare"
    },
    {
        id: "identify-duplicates",
        type: "When",
        label: "Identify Duplicates",
        template: "They run an {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The identification action" }
        ],
        category: "Healthcare"
    },
    {
        id: "review-duplicate-list",
        type: "Then",
        label: "Review Duplicate List",
        template: "They {review} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for review" },
            { name: "review", type: "string", required: true, description: "The list to review" }
        ],
        category: "Healthcare"
    },
    {
        id: "remove-duplicates",
        type: "When",
        label: "Remove Duplicates",
        template: "They perform the {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The removal action" }
        ],
        category: "Healthcare"
    },
    {
        id: "upload-ai-model",
        type: "When",
        label: "Upload AI Model",
        template: "They upload a {model} model on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for upload" },
            { name: "model", type: "string", required: true, description: "The AI model to upload" }
        ],
        category: "Healthcare"
    },
    {
        id: "configure-model-parameters",
        type: "When",
        label: "Configure Model Parameters",
        template: "They configure the {configuration} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for configuration" },
            { name: "configuration", type: "string", required: true, description: "The model parameters" }
        ],
        category: "Healthcare"
    },
    {
        id: "execute-model",
        type: "When",
        label: "Execute Model",
        template: "They run the {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The model execution action" }
        ],
        category: "Healthcare"
    },
    {
        id: "review-model-results",
        type: "Then",
        label: "Review Model Results",
        template: "They {review} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for review" },
            { name: "review", type: "string", required: true, description: "The model results to review" }
        ],
        category: "Healthcare"
    },
    {
        id: "access-metadata-enrichment",
        type: "Given",
        label: "Access Metadata Enrichment",
        template: "The user accesses the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "The metadata enrichment page" }
        ],
        category: "Healthcare"
    },
    {
        id: "select-data-source",
        type: "When",
        label: "Select Data Source",
        template: "They make a {selection} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for selection" },
            { name: "selection", type: "string", required: true, description: "The data source selection" }
        ],
        category: "Healthcare"
    },
    {
        id: "apply-enrichment",
        type: "When",
        label: "Apply Enrichment",
        template: "They perform an {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The enrichment action" }
        ],
        category: "Healthcare"
    },
    {
        id: "review-enriched-metadata",
        type: "Then",
        label: "Review Enriched Metadata",
        template: "They {review} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for review" },
            { name: "review", type: "string", required: true, description: "The metadata to review" }
        ],
        category: "Healthcare"
    },
    {
        id: "save-enrichment-results",
        type: "When",
        label: "Save Enrichment Results",
        template: "They perform the {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The save action" }
        ],
        category: "Healthcare"
    },
    {
        id: "configure-encryption",
        type: "When",
        label: "Configure Encryption",
        template: "They configure the {feature} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for configuration" },
            { name: "feature", type: "string", required: true, description: "The encryption feature" }
        ],
        category: "Healthcare"
    },
    {
        id: "generate-encryption-keys",
        type: "When",
        label: "Generate Encryption Keys",
        template: "They run the {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The key generation action" }
        ],
        category: "Healthcare"
    },
    {
        id: "test-encryption",
        type: "Then",
        label: "Test Encryption",
        template: "They run a {test} test on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for test" },
            { name: "test", type: "string", required: true, description: "The encryption test" }
        ],
        category: "Healthcare"
    },
    {
        id: "verify-key-management",
        type: "Then",
        label: "Verify Key Management",
        template: "They verify the {verification} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for verification" },
            { name: "verification", type: "string", required: true, description: "The key management verification" }
        ],
        category: "Healthcare"
    },
    {
        id: "analyze-storage-usage",
        type: "When",
        label: "Analyze Storage Usage",
        template: "They run an {analysis} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for analysis" },
            { name: "analysis", type: "string", required: true, description: "The usage analysis" }
        ],
        category: "Healthcare"
    },
    {
        id: "generate-performance-report",
        type: "Then",
        label: "Generate Performance Report",
        template: "They {action} a report on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The report generation action" }
        ],
        category: "Healthcare"
    },
    {
        id: "set-performance-alerts",
        type: "When",
        label: "Set Performance Alerts",
        template: "They {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The alert setting action" }
        ],
        category: "Healthcare"
    },
    {
        id: "view-compliance-status",
        type: "When",
        label: "View Compliance Status",
        template: "They view the {status} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for viewing status" },
            { name: "status", type: "string", required: true, description: "The compliance status to view" }
        ],
        category: "Healthcare"
    },
    {
        id: "select-data-sources",
        type: "When",
        label: "Select Data Sources",
        template: "They make a {selection} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for selection" },
            { name: "selection", type: "string", required: true, description: "The data sources to select" }
        ],
        category: "Healthcare"
    },
    {
        id: "run-analytics-queries",
        type: "When",
        label: "Run Analytics Queries",
        template: "They {action} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for action" },
            { name: "action", type: "string", required: true, description: "The query run action" }
        ],
        category: "Healthcare"
    },
    {
        id: "visualize-results",
        type: "Then",
        label: "Visualize Results",
        template: "They view a {visualization} on the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for visualization" },
            { name: "visualization", type: "string", required: true, description: "The data visualization" }
        ],
        category: "Healthcare"
    },
    {
        id: "export-analytics-results",
        type: "When",
        label: "Export Analytics Results",
        template: "They {export} from the {page} page",
        params: [
            { name: "page", type: "page", required: true, description: "Page for export" },
            { name: "export", type: "string", required: true, description: "The results to export" }
        ],
        category: "Healthcare"
    }
]; 