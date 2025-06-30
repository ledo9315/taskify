module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/components/provider/ThemeProvider.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ThemeProvider": (()=>ThemeProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/provider/ThemeProvider.tsx",
        lineNumber: 8,
        columnNumber: 10
    }, this);
}
}}),
"[project]/src/components/provider/TanstackQueryProvider.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TanstackQueryProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2d$devtools$2f$build$2f$modern$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query-devtools/build/modern/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function TanstackQueryProvider({ children }) {
    const [queryClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClient"]());
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: queryClient,
        children: [
            children,
            ("TURBOPACK compile-time value", "development") === "development" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2d$devtools$2f$build$2f$modern$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReactQueryDevtools"], {}, void 0, false, {
                fileName: "[project]/src/components/provider/TanstackQueryProvider.tsx",
                lineNumber: 17,
                columnNumber: 50
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/provider/TanstackQueryProvider.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/ui/sonner.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Toaster": (()=>Toaster)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
const Toaster = ({ ...props })=>{
    const { theme = "system" } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toaster"], {
        theme: theme,
        className: "toaster group",
        style: {
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--border-radius": "0px"
        },
        toastOptions: {
            classNames: {
                description: "dark:!text-[#e0e0e0]",
                actionButton: "rounded-none dark:bg-[#2d2d2d] dark:hover:bg-[#3a3a3a]",
                cancelButton: "dark:!text-gray-300"
            }
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/sonner.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
};
;
}}),
"[project]/src/lang/de.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("{\"AppSidebar.completed\":\"Abgeschlossen\",\"AppSidebar.open\":\"Offen\",\"AppSidebar.account\":\"Konto\",\"AppSidebar.logout\":\"Abmelden\",\"AppSidebar.tasks\":\"Aufgaben\",\"AppSidebar.byDueDate\":\"Nach Fälligkeit\",\"AppSidebar.byPriority\":\"Nach Priorität\",\"AppSidebar.overdue\":\"Überfällig\",\"AppSidebar.dueToday\":\"Heute fällig\",\"AppSidebar.noDueDate\":\"Ohne Fälligkeit\",\"AppSidebar.highPriority\":\"Hohe Priorität\",\"AppSidebar.mediumPriority\":\"Mittlere Priorität\",\"AppSidebar.lowPriority\":\"Niedrige Priorität\",\"AppSidebar.byTags\":\"Nach Tags\",\"AppSidebar.selectTag\":\"Tag auswählen...\",\"AppSidebar.searchTags\":\"Tags durchsuchen...\",\"AppSidebar.noTagsFound\":\"Keine Tags gefunden.\",\"MainPageContent.title.completedTasks\":\"Abgeschlossene Aufgaben\",\"MainPageContent.title.openTasks\":\"Offene Aufgaben\",\"MainPageContent.title.overdueTasks\":\"Überfällige Aufgaben\",\"MainPageContent.title.dueTodayTasks\":\"Heute fällige Aufgaben\",\"MainPageContent.title.noDueDateTasks\":\"Aufgaben ohne Fälligkeit\",\"MainPageContent.title.highPriorityTasks\":\"Aufgaben mit hoher Priorität\",\"MainPageContent.title.mediumPriorityTasks\":\"Aufgaben mit mittlerer Priorität\",\"MainPageContent.title.lowPriorityTasks\":\"Aufgaben mit niedriger Priorität\",\"MainPageContent.title.tagFilterTasks\":\"Nach Tag gefiltert\",\"TaskEditor.errorMessage\":\"Fehler beim Laden der Aufgabe.\",\"TaskForm.addTask\":\"Aufgabe hinzufügen\",\"TaskForm.cancel\":\"Abbrechen\",\"TaskForm.description.minLength\":\"Beschreibung muss mindestens 3 Zeichen lang sein\",\"TaskForm.description.notEmpty\":\"Beschreibung darf nicht leer sein\",\"TaskForm.description.required\":\"Beschreibung ist erforderlich\",\"TaskForm.editTask\":\"Aufgabe bearbeiten\",\"TaskForm.submit.addTask\":\"Aufgabe hinzufügen\",\"TaskForm.submit.editTask\":\"Aufgabe bearbeiten\",\"TaskForm.tags.id\":\"Bitte mindestens einen Tag hinzufügen\",\"TaskForm.title.minLength\":\"Titel muss mindestens 3 Zeichen lang sein\",\"TaskForm.title.notEmpty\":\"Titel darf nicht leer sein\",\"TaskForm.title.required\":\"Titel ist erforderlich\",\"TaskForm.labels.title\":\"Titel\",\"TaskForm.labels.description\":\"Beschreibung\",\"TaskForm.labels.tags\":\"Tags\",\"TaskForm.labels.priority\":\"Priorität\",\"TaskForm.priority.placeholder\":\"Priorität auswählen\",\"TaskForm.priority.low\":\"Niedrig\",\"TaskForm.priority.medium\":\"Mittel\",\"TaskForm.priority.high\":\"Hoch\",\"TaskForm.dueDate.invalid\":\"Fälligkeitsdatum muss in der Zukunft liegen\",\"TagInput.placeholder\":\"Enter drücken, um Tag hinzuzufügen\",\"TagInput.error.minLength\":\"Tag muss mindestens 3 Zeichen lang sein.\",\"TaskItemDate.CreatedText\":\"Erstellt am\",\"TaskItemDate.UpdatedText\":\"Aktualisiert am\",\"TaskItemDate.timeUnit\":\"Uhr\",\"TaskItemDate.DueOn\":\"Fällig am\",\"TaskItemDate.DueToday\":\"Fällig heute um\",\"TaskItemDate.DueTomorrow\":\"Fällig morgen um\",\"TaskItemDate.DueYesterday\":\"Gestern fällig gewesen\",\"TaskItemDate.OverdueSince\":\"Überfällig seit\",\"DateTimePicker.addDueDate\":\"Fälligkeitsdatum hinzufügen?\",\"DateTimePicker.selectDate\":\"Datum auswählen\",\"Toast.taskCreated\":\"Neue Aufgabe erstellt\",\"Toast.taskUpdated\":\"Aufgabe aktualisiert\",\"Toast.taskUpdateError\":\"Fehler beim Aktualisieren der Aufgabe\",\"Toast.taskUpdateErrorDescription\":\"Bitte versuche es später erneut.\",\"Toast.taskUpdatedDescription\":\"Die Aufgabe wurde erfolgreich aktualisiert.\",\"Toast.taskToggled.completed\":\"Aufgabe als erledigt markiert\",\"Toast.taskToggled.open\":\"Aufgabe als offen markiert\",\"Toast.taskToggleError\":\"Fehler beim Aktualisieren der Aufgabe\",\"Toast.taskDeleted\":\"Aufgabe wurde erfolgreich gelöscht\",\"Toast.taskDeleteError\":\"Fehler beim Löschen der Aufgabe\",\"Toast.unknown\":\"Unbekannt\",\"TaskSection.isError.showErrorText\":\"Fehler beim Laden der Aufgaben\",\"TaskSection.isLoaded.noCompletedTasks\":\"Keine abgeschlossenen Aufgaben\",\"TaskSection.isLoaded.noOpenTasks\":\"Keine offenen Aufgaben\",\"TaskSection.isPending.showLoadingText\":\"Lade Aufgaben...\",\"ThemeToggle.changeTheme\":\"Theme wechseln\",\"ThemeToggle.mode\":\"mode\",\"ThemeToggle.languageToggle\":\"Sprache wechseln\",\"TaskDetail.error\":\"Fehler beim Laden der Aufgabe.\",\"TaskDetail.notFound\":\"Aufgabe nicht gefunden.\",\"TaskDetail.description\":\"Beschreibung\",\"TaskDetail.tags\":\"Tags\",\"TaskDetail.timestamps\":\"Zeitstempel\",\"TaskDetail.taskDetails\":\"Aufgabendetails\",\"TaskDetail.addTask\":\"Aufgabe hinzufügen\",\"Navigation.home\":\"Startseite\",\"Navigation.back\":\"Zurück zur Startseite\",\"Landing.hero.title\":\"Aufgaben leicht gemacht\",\"Landing.hero.subtitle\":\"Organisiere deine Tasks, behalte den Überblick und arbeite produktiver. Komplett kostenlos und ohne Anmeldezwang.\",\"Landing.hero.registerButton\":\"Kostenlos registrieren\",\"Landing.hero.loginButton\":\"Anmelden\",\"Landing.hero.feature1\":\"Komplett kostenlos\",\"Landing.hero.feature2\":\"Sofort loslegen\",\"Landing.hero.feature3\":\"Weitere Funktionen\",\"Landing.features.card1.title\":\"Einfach hinzufügen\",\"Landing.features.card1.description\":\"Neue Aufgaben in Sekunden erstellen und bearbeiten\",\"Landing.features.card2.title\":\"Termine im Blick\",\"Landing.features.card2.description\":\"Deadlines setzen und rechtzeitig erledigen\",\"Landing.features.card3.title\":\"Clever organisieren\",\"Landing.features.card3.description\":\"Mit Tags und Kategorien den Überblick behalten\",\"Landing.dashboard.title\":\"Dein persönliches Dashboard\",\"Landing.dashboard.subtitle\":\"Behalte alle deine Aufgaben im Überblick mit unserer intuitiven und übersichtlichen Benutzeroberfläche.\",\"Landing.dashboard.imageAlt\":\"Taskify Hero Image - Aufgabenverwaltung\",\"Landing.footer.privacy\":\"Datenschutz\",\"Landing.footer.terms\":\"Nutzungsbedingungen\",\"Landing.footer.contact\":\"Kontakt\",\"Login.title\":\"Bei deinem Konto anmelden\",\"Login.description\":\"Gib deine E-Mail-Adresse unten ein, um dich bei deinem Konto anzumelden\",\"Login.signUpLink\":\"Registrieren\",\"Login.email\":\"E-Mail\",\"Login.emailPlaceholder\":\"m@example.com\",\"Login.password\":\"Passwort\",\"Login.forgotPassword\":\"Passwort vergessen?\",\"Login.loginButton\":\"Anmelden\",\"Login.loginWithGoogle\":\"Mit Google anmelden\",\"Login.loginSuccess\":\"Erfolgreich angemeldet!\",\"Login.emailVerificationRequired\":\"Bitte verifiziere deine E-Mail-Adresse. Eine Verifizierungs-E-Mail wurde an dich gesendet.\",\"Login.invalidCredentials\":\"Ungültige E-Mail-Adresse oder Passwort.\",\"Login.loginFailed\":\"Anmeldung fehlgeschlagen. Bitte versuche es erneut.\",\"Login.resendVerification\":\"Verifizierungs-E-Mail erneut senden\",\"Login.ForgotPassword\":\"Passwort vergessen?\",\"Register.title\":\"Konto erstellen\",\"Register.description\":\"Gib deine Daten unten ein, um dein Konto zu erstellen\",\"Register.signInLink\":\"Anmelden\",\"Register.email\":\"E-Mail\",\"Register.firstName\":\"Vorname\",\"Register.lastName\":\"Nachname\",\"Register.emailPlaceholder\":\"m@example.com\",\"Register.password\":\"Passwort\",\"Register.confirmPassword\":\"Passwort bestätigen\",\"Register.image\":\"Profilbild (optional)\",\"Register.registerButton\":\"Registrieren\",\"Register.registerWithGoogle\":\"Mit Google registrieren\",\"Login.validation.emailRequired\":\"Email ist erforderlich\",\"Login.validation.emailInvalid\":\"Ungültige Email-Adresse\",\"Login.validation.passwordRequired\":\"Passwort ist erforderlich\",\"Login.validation.passwordMinLength\":\"Passwort muss mindestens 6 Zeichen lang sein\",\"Register.validation.emailRequired\":\"Email ist erforderlich\",\"Register.validation.emailInvalid\":\"Ungültige Email-Adresse\",\"Register.validation.firstNameRequired\":\"Vorname ist erforderlich\",\"Register.validation.firstNameMinLength\":\"Vorname muss mindestens 2 Zeichen lang sein\",\"Register.validation.lastNameRequired\":\"Nachname ist erforderlich\",\"Register.validation.lastNameMinLength\":\"Nachname muss mindestens 2 Zeichen lang sein\",\"Register.validation.passwordRequired\":\"Passwort ist erforderlich\",\"Register.validation.passwordMinLength\":\"Passwort muss mindestens 6 Zeichen lang sein\",\"Register.validation.confirmPasswordRequired\":\"Passwort ist erforderlich\",\"Register.validation.passwordMismatch\":\"Passwörter stimmen nicht überein\",\"Toast.taskCreateError\":\"Fehler beim Erstellen der Aufgabe\",\"Toast.notLoggedIn\":\"Bitte loggen Sie sich ein\",\"VerifyEmail.title\":\"E-Mail verifizieren\",\"VerifyEmail.description\":\"Gib deine E-Mail-Adresse ein, um eine neue Verifizierungs-E-Mail zu erhalten.\",\"VerifyEmail.email\":\"E-Mail-Adresse\",\"VerifyEmail.sendButton\":\"Verifizierungs-E-Mail senden\",\"VerifyEmail.sending\":\"Wird gesendet...\",\"VerifyEmail.success\":\"Verifizierungs-E-Mail wurde erfolgreich gesendet!\",\"VerifyEmail.successTitle\":\"E-Mail gesendet!\",\"VerifyEmail.successDescription\":\"Prüfe dein E-Mail-Postfach und klicke auf den Verifizierungslink.\",\"VerifyEmail.error\":\"Fehler beim Senden der E-Mail. Bitte versuche es erneut.\",\"VerifyEmail.backToLogin\":\"Zurück zur Anmeldung\",\"VerifyEmail.validation.emailRequired\":\"E-Mail-Adresse ist erforderlich\",\"VerifyEmail.validation.emailInvalid\":\"Ungültige E-Mail-Adresse\",\"VerifyEmail.justRegisteredDescription\":\"Wir haben dir eine E-Mail geschickt. Bitte bestätige deine Adresse über den Link in der E-Mail, um deinen Account zu aktivieren.\",\"VerifyEmail.resendButton\":\"Verifizierungs-E-Mail erneut senden\",\"ForgotPassword.title\":\"Passwort vergessen?\",\"ForgotPassword.description\":\"Gib deine E-Mail-Adresse ein, um dein Passwort zurückzusetzen.\",\"ForgotPassword.email\":\"E-Mail-Adresse\",\"ForgotPassword.sendButton\":\"Passwort-Reset senden\",\"ForgotPassword.sending\":\"Wird gesendet...\",\"ForgotPassword.successTitle\":\"E-Mail gesendet!\",\"ForgotPassword.success\":\"Wenn die E-Mail existiert, wurde eine Nachricht zum Zurücksetzen des Passworts gesendet.\",\"ForgotPassword.error\":\"Fehler beim Senden der E-Mail. Bitte versuche es erneut.\",\"ForgotPassword.validation.emailRequired\":\"E-Mail-Adresse ist erforderlich\",\"ForgotPassword.validation.emailInvalid\":\"Ungültige E-Mail-Adresse\",\"ForgotPassword.backToLogin\":\"Zurück zur Anmeldung\",\"ResetPassword.validation.passwordRequired\":\"Ein neues Passwort ist erforderlich.\",\"ResetPassword.validation.passwordLength\":\"Das Passwort muss mindestens 8 Zeichen lang sein.\",\"ResetPassword.validation.confirmPasswordRequired\":\"Passwortbestätigung ist erforderlich.\",\"ResetPassword.validation.passwordMismatch\":\"Passwörter stimmen nicht überein\",\"ResetPassword.confirmPassword\":\"Passwort bestätigen\",\"ResetPassword.backToLogin\":\"Zurück zur Anmeldung\",\"Login.emailVerifiedSuccess\":\"E-Mail erfolgreich verifiziert! Du kannst dich jetzt anmelden.\",\"sort.due\":\"Fälligkeit\",\"sort.priority\":\"Priorität\",\"sort.created\":\"Erstellt\",\"sort.updated\":\"Aktualisiert\"}"));}}),
"[project]/src/lang/en.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("{\"AppSidebar.NewTask\":\"New Task\",\"AppSidebar.completed\":\"Completed\",\"AppSidebar.account\":\"Account\",\"AppSidebar.logout\":\"Logout\",\"AppSidebar.open\":\"Open\",\"AppSidebar.tasks\":\"Tasks\",\"AppSidebar.byDueDate\":\"By Due Date\",\"AppSidebar.byPriority\":\"By Priority\",\"AppSidebar.overdue\":\"Overdue\",\"AppSidebar.dueToday\":\"Due Today\",\"AppSidebar.noDueDate\":\"No Due Date\",\"AppSidebar.highPriority\":\"High Priority\",\"AppSidebar.mediumPriority\":\"Medium Priority\",\"AppSidebar.lowPriority\":\"Low Priority\",\"AppSidebar.byTags\":\"By Tags\",\"AppSidebar.selectTag\":\"Select tag...\",\"AppSidebar.searchTags\":\"Search tags...\",\"AppSidebar.noTagsFound\":\"No tags found.\",\"MainPageContent.title.completedTasks\":\"Completed Tasks\",\"MainPageContent.title.openTasks\":\"Open Tasks\",\"MainPageContent.title.overdueTasks\":\"Overdue Tasks\",\"MainPageContent.title.dueTodayTasks\":\"Tasks Due Today\",\"MainPageContent.title.noDueDateTasks\":\"Tasks Without Due Date\",\"MainPageContent.title.highPriorityTasks\":\"High Priority Tasks\",\"MainPageContent.title.mediumPriorityTasks\":\"Medium Priority Tasks\",\"MainPageContent.title.lowPriorityTasks\":\"Low Priority Tasks\",\"MainPageContent.title.tagFilterTasks\":\"Filtered by Tag\",\"TaskEditor.errorMessage\":\"Error loading the task.\",\"TaskForm.addTask\":\"Add Task\",\"TaskForm.cancel\":\"Cancel\",\"TaskForm.description.minLength\":\"Description must be at least 3 characters long\",\"TaskForm.description.notEmpty\":\"Description must not be empty\",\"TaskForm.description.required\":\"Description is required\",\"TaskForm.editTask\":\"Edit Task\",\"TaskForm.submit.addTask\":\"Add Task\",\"TaskForm.submit.editTask\":\"Edit Task\",\"TaskForm.tags.id\":\"Please add at least one tag\",\"TaskForm.title.minLength\":\"Title must be at least 3 characters long\",\"TaskForm.title.notEmpty\":\"Title must not be empty\",\"TaskForm.title.required\":\"Title is required\",\"TaskForm.labels.title\":\"Title\",\"TaskForm.labels.description\":\"Description\",\"TaskForm.labels.tags\":\"Tags\",\"TaskForm.labels.priority\":\"Priority\",\"TaskForm.priority.placeholder\":\"Select priority\",\"TaskForm.priority.low\":\"Low\",\"TaskForm.priority.medium\":\"Medium\",\"TaskForm.priority.high\":\"High\",\"TaskForm.dueDate.invalid\":\"Due date must be in the future\",\"TagInput.placeholder\":\"Press Enter to add tag\",\"TagInput.error.minLength\":\"Tag must be at least 3 characters long.\",\"TaskItemDate.CreatedText\":\"Created on\",\"TaskItemDate.UpdatedText\":\"Updated on\",\"TaskItemDate.timeUnit\":\" \",\"TaskItemDate.DueOn\":\"Due on\",\"TaskItemDate.DueToday\":\"Due today at\",\"TaskItemDate.DueTomorrow\":\"Due tomorrow at\",\"TaskItemDate.DueYesterday\":\"Was due yesterday\",\"TaskItemDate.OverdueSince\":\"Overdue since\",\"DateTimePicker.addDueDate\":\"Add due date?\",\"DateTimePicker.selectDate\":\"Select date\",\"Toast.taskCreated\":\"New task created\",\"Toast.taskUpdated\":\"Task updated\",\"Toast.taskUpdateError\":\"Error updating task\",\"Toast.taskUpdateErrorDescription\":\"Please try again later.\",\"Toast.taskUpdatedDescription\":\"The task was successfully updated.\",\"Toast.taskToggled.completed\":\"Task marked as completed\",\"Toast.taskToggled.open\":\"Task marked as open\",\"Toast.taskToggleError\":\"Error updating task\",\"Toast.taskDeleted\":\"Task was successfully deleted\",\"Toast.taskDeleteError\":\"Error deleting task\",\"Toast.unknown\":\"Unknown\",\"TaskSection.isError.showErrorText\":\"Error loading tasks\",\"TaskSection.isLoaded.noCompletedTasks\":\"No completed tasks\",\"TaskSection.isLoaded.noOpenTasks\":\"No open tasks\",\"TaskSection.isPending.showLoadingText\":\"Loading tasks...\",\"ThemeToggle.changeTheme\":\"Change theme\",\"ThemeToggle.mode\":\"mode\",\"ThemeToggle.languageToggle\":\"Change language\",\"TaskDetail.error\":\"Error loading the task.\",\"TaskDetail.notFound\":\"Task not found.\",\"TaskDetail.description\":\"Description\",\"TaskDetail.tags\":\"Tags\",\"TaskDetail.timestamps\":\"Timestamps\",\"TaskDetail.taskDetails\":\"Task details\",\"TaskDetail.addTask\":\"Add task\",\"Navigation.home\":\"Home\",\"Navigation.back\":\"Back to home\",\"Landing.hero.title\":\"Tasks made easy\",\"Landing.hero.subtitle\":\"Organize your tasks, keep track and work more productively. Completely free and without registration requirement.\",\"Landing.hero.registerButton\":\"Register for free\",\"Landing.hero.loginButton\":\"Sign in\",\"Landing.hero.feature1\":\"Completely free\",\"Landing.hero.feature2\":\"Get started immediately\",\"Landing.hero.feature3\":\"More features\",\"Landing.features.card1.title\":\"Easy to add\",\"Landing.features.card1.description\":\"Create and edit new tasks in seconds\",\"Landing.features.card2.title\":\"Keep track of dates\",\"Landing.features.card2.description\":\"Set deadlines and complete them on time\",\"Landing.features.card3.title\":\"Smart organization\",\"Landing.features.card3.description\":\"Keep track with tags and categories\",\"Landing.dashboard.title\":\"Your personal dashboard\",\"Landing.dashboard.subtitle\":\"Keep track of all your tasks with our intuitive and clear user interface.\",\"Landing.dashboard.imageAlt\":\"Taskify Hero Image - Task management\",\"Landing.footer.privacy\":\"Privacy\",\"Landing.footer.terms\":\"Terms of service\",\"Landing.footer.contact\":\"Contact\",\"Login.title\":\"Login to your account\",\"Login.description\":\"Enter your email below to login to your account\",\"Login.signUpLink\":\"Sign Up\",\"Login.email\":\"Email\",\"Login.emailPlaceholder\":\"m@example.com\",\"Login.password\":\"Password\",\"Login.forgotPassword\":\"Forgot your password?\",\"Login.loginButton\":\"Login\",\"Login.loginWithGoogle\":\"Login with Google\",\"Login.loginSuccess\":\"Successfully logged in!\",\"Login.emailVerificationRequired\":\"Please verify your email address. A verification email has been sent to you.\",\"Login.invalidCredentials\":\"Invalid email address or password.\",\"Login.loginFailed\":\"Login failed. Please try again.\",\"Login.resendVerification\":\"Resend verification email\",\"Login.ForgotPassword\":\"Forgot your password?\",\"Register.title\":\"Create an account\",\"Register.description\":\"Enter your details below to create your account\",\"Register.signInLink\":\"Sign In\",\"Register.email\":\"Email\",\"Register.firstName\":\"First Name\",\"Register.lastName\":\"Last Name\",\"Register.emailPlaceholder\":\"m@example.com\",\"Register.password\":\"Password\",\"Register.confirmPassword\":\"Confirm Password\",\"Register.image\":\"Profile Picture (optional)\",\"Register.registerButton\":\"Register\",\"Register.registerWithGoogle\":\"Register with Google\",\"Login.validation.emailRequired\":\"Email is required\",\"Login.validation.emailInvalid\":\"Invalid email address\",\"Login.validation.passwordRequired\":\"Password is required\",\"Login.validation.passwordMinLength\":\"Password must be at least 6 characters long\",\"Register.validation.emailRequired\":\"Email is required\",\"Register.validation.emailInvalid\":\"Invalid email address\",\"Register.validation.firstNameRequired\":\"First name is required\",\"Register.validation.firstNameMinLength\":\"First name must be at least 2 characters long\",\"Register.validation.lastNameRequired\":\"Last name is required\",\"Register.validation.lastNameMinLength\":\"Last name must be at least 2 characters long\",\"Register.validation.passwordRequired\":\"Password is required\",\"Register.validation.passwordMinLength\":\"Password must be at least 6 characters long\",\"Register.validation.confirmPasswordRequired\":\"Password is required\",\"Register.validation.passwordMismatch\":\"Passwords do not match\",\"Toast.taskCreateError\":\"Error creating task\",\"Toast.notLoggedIn\":\"Please log in\",\"VerifyEmail.title\":\"Verify Email\",\"VerifyEmail.description\":\"Enter your email address to receive a new verification email.\",\"VerifyEmail.email\":\"Email Address\",\"VerifyEmail.sendButton\":\"Send Verification Email\",\"VerifyEmail.sending\":\"Sending...\",\"VerifyEmail.success\":\"Verification email has been sent successfully!\",\"VerifyEmail.successTitle\":\"Email Sent!\",\"VerifyEmail.successDescription\":\"Check your email inbox and click on the verification link.\",\"VerifyEmail.error\":\"Error sending email. Please try again.\",\"VerifyEmail.backToLogin\":\"Back to Login\",\"VerifyEmail.validation.emailRequired\":\"Email address is required\",\"VerifyEmail.validation.emailInvalid\":\"Invalid email address\",\"VerifyEmail.justRegisteredDescription\":\"We have sent you an email. Please verify your address via the link in the email to activate your account.\",\"VerifyEmail.resendButton\":\"Resend verification email\",\"ForgotPassword.title\":\"Forgot password?\",\"ForgotPassword.description\":\"Enter your email address to reset your password.\",\"ForgotPassword.email\":\"Email address\",\"ForgotPassword.sendButton\":\"Send password reset\",\"ForgotPassword.sending\":\"Sending...\",\"ForgotPassword.successTitle\":\"Email sent!\",\"ForgotPassword.success\":\"If the email exists, a password reset message has been sent.\",\"ForgotPassword.error\":\"Error sending email. Please try again.\",\"ForgotPassword.validation.emailRequired\":\"Email address is required\",\"ForgotPassword.validation.emailInvalid\":\"Invalid email address\",\"ForgotPassword.backToLogin\":\"Back to login\",\"ResetPassword.title\":\"Reset Password\",\"ResetPassword.description\":\"Enter your new password.\",\"ResetPassword.newPassword\":\"New Password\",\"ResetPassword.saveButton\":\"Save New Password\",\"ResetPassword.saving\":\"Saving...\",\"ResetPassword.successTitle\":\"Password Reset!\",\"ResetPassword.success\":\"Your password has been reset successfully.\",\"ResetPassword.redirecting\":\"You will be redirected shortly...\",\"ResetPassword.error.noToken\":\"No valid token found. Please request a new link.\",\"ResetPassword.error.general\":\"Failed to reset password. The link may have expired.\",\"ResetPassword.validation.passwordRequired\":\"A new password is required.\",\"ResetPassword.validation.passwordLength\":\"The password must be at least 8 characters long.\",\"ResetPassword.validation.confirmPasswordRequired\":\"Password confirmation is required.\",\"ResetPassword.validation.passwordMismatch\":\"Passwords do not match\",\"ResetPassword.confirmPassword\":\"Confirm Password\",\"ResetPassword.backToLogin\":\"Back to login\",\"Login.emailVerifiedSuccess\":\"Email successfully verified! You can now log in.\",\"sort.due\":\"Due Date\",\"sort.priority\":\"Priority\",\"sort.created\":\"Created\",\"sort.updated\":\"Updated\"}"));}}),
"[project]/src/components/locale/locale.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "DEFAULT_LOCALE": (()=>DEFAULT_LOCALE),
    "SUPPORTED_LOCALES": (()=>SUPPORTED_LOCALES),
    "isValidLocale": (()=>isValidLocale),
    "messages": (()=>messages)
});
const messages = {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    de: __turbopack_context__.r("[project]/src/lang/de.json (json)"),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    en: __turbopack_context__.r("[project]/src/lang/en.json (json)")
};
const SUPPORTED_LOCALES = [
    "de",
    "en"
];
const DEFAULT_LOCALE = "de";
function isValidLocale(locale) {
    return SUPPORTED_LOCALES.includes(locale);
}
;
}}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/components/provider/LocaleProvider.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intl$2f$lib$2f$src$2f$components$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IntlProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/react-intl/lib/src/components/provider.js [app-ssr] (ecmascript) <export default as IntlProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$locale$2f$locale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/locale/locale.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const LocaleProvider = ({ children, locale: initialLocale })=>{
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const [currentLocale, setCurrentLocale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialLocale);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const urlLocale = params.locale;
        // Nur gültige Locales setzen
        if (urlLocale && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$locale$2f$locale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isValidLocale"])(urlLocale) && urlLocale !== currentLocale) {
            setCurrentLocale(urlLocale);
        }
    }, [
        params.locale,
        currentLocale
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intl$2f$lib$2f$src$2f$components$2f$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__IntlProvider$3e$__["IntlProvider"], {
        locale: currentLocale,
        defaultLocale: "de",
        messages: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$locale$2f$locale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["messages"][currentLocale],
        children: children
    }, currentLocale, false, {
        fileName: "[project]/src/components/provider/LocaleProvider.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = LocaleProvider;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__3918297b._.js.map