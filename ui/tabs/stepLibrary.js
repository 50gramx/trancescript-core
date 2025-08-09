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
    }
]; 