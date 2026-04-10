# Laboration 2 | TypeScript 

I denna laboration inom TypeScript skapar jag en applikation för användare att skriva ned sina "Att göra uppgifter" som också kallas Todos.
VITE används som paket för att automatisera och optimera applikationens innehåll.

**Webbplats:** https://todo-lab2-fb.netlify.app/


<p align="center">
<img width="600" height="455" alt="skärmbild-github" src="https://github.com/user-attachments/assets/939203ac-82eb-463a-9cd9-8307794b9521" />
</p>

## Interface
Ett Interface, **Todo**, skapades inom IfTodo.ts för att beskriva en uppgift med namn (task), avklarad/ej avklarad (completed), samt prioritet (priority) mellan numren 1-3. Högst prio: 1 & lägst prio: 3.

Interfacet innehåller alltså egenskaperna:
- **task**: string;
- **completed**: boolean;
- **priority**: number;

## Klass
Klassen **TodoList** skapades inom TodoList.ts för att sköta logiken inom applikationen.
En array för todo-objekt definierades inom klassen: private todos: Todo[] = [];
Varje objekt byggs enligt interfacet med task, completed och priority. 

### Constructor
Constructor används inom klassen för att ladda in sparade todos från localStorage och körs automatiskt när nya todolist-objekt skapas.

Inom klassen finns metoder som visar hur webbplatsen ska reagera och fungera på användarinteraktioner.

Exempelvis:
- **addTodo**, metoden för att lägga till en ny todo, innan en ny todo läggs till görs först en validering om användarinnehållet är korrekt.
- **markTodoCompleted**, för att markera en uppgift som slutförd genom false/true. Den tar en parameter som todoIndex för att bestämma vilket objekt som den syftar till inom arrayen av todos.
- **getTodos**, för att hämta och returnera hela arrayen med todos för att sedan kunna visa listan inom DOM.
- **saveTolocalStorage**, för att spara nya todos till localStorage.
- **loadFromLocalStorage**, för att hämta hela arrayen av todos-objekt inom localstorage
- **clearTodos**, för att rensa alla uppgifter
- **sortTodosByPriority**, två metoder där ena sorterar listan av uppgifter stigande medan den andra sorterar den fallande.
- **removeTodo**, för att ta bort en specifik todo inom listan av uppgifter, detta genom localstorage där jag använde funktionen splice samt indexet på en specifik todo inom arrayen.

## Utskrift till DOM
Inom main.ts skrevs kod som använde metoderna för att generera innehåll och interaktion till användaren. 

Exempelvis:
- Felmeddelanden för när användaren skrivit in en bokstav istället för en siffra inom prioritet: "Ange en prioritet mellan siffrorna 1-3".
- Funktion för att ta bort felmeddelanden.
- **renderTodos**, funktionen skapar element som behövs för att göra en lämplig utskrift till DOM. Div, p, span, checkbox, knapp och slutligen tillhörande innehåll. 
- Eventlyssnare på ikon, knappar, formulär för att initiera metoder och funktioner.

## HTML
En enkel struktur skapades inom HTML med överskrift, formulär med textfält för uppgift och prioritet, knapp för att lägga till uppgiften samt en lista där "todos" ska skrivas ut till.

### Ytterligare funktionalitet
Slutligen valde jag att lägga till funktioner som att sortera uppgifter, radera en enskild uppgift och radera alla uppgifterna i listan genom att rensa arrayen av todos samt localStorage.

För att piffa upp layouten och användargränssnittet valde jag att styla med ikoner, färger, skuggor och hoover-effekter.

Jag la till aria-labels där jag kände det var nödvändigt för att höja tillgängligheten.

### Avslutningsvis
Jag skapade först klassen TodoList och implementerade interfacet inom den med egenskaperna task, completed och priority. Jag fick dock problem när jag sedan skulle skapa en instans av klassen inom min main.ts. Det gick inte att använda den eftersom constructorn krävde dessa värden som argument. 

Jag valde att ta bort "implements todo" och låta klassen innehålla bara en array av todo-objekt. Detta gjorde att jag kunde komma vidare och faktiskt implementera metoderna i mina funktioner.

Jag tror jag missförstod det hela i början, och tyckte det var krångligt att komma igång. Jag lyssnade på de föreläsningar vi haft, ställde frågor till lärarna, gjorde research på Internet och YouTube samt läste kursmodulen som finns på Canvas inom kursen Programmering i TypeScript.

Som en slutlig reflektion upplever jag att TypeScript ger bra felmeddelanden inom VSC. Man ser tydligare vad som är fel jämfört med endast JavaScript. Jag tror det krävs tid och programmering innan förståelsen sätter sig för TypeScript. JavaScript upplevs som enklare just nu eftersom jag är van med det språket, däremot är de väldigt lika i syntaxen.   

**Filip Bergander 2026**
