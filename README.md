# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Packing List App - README

This repository contains a simple React application to manage a packing list for a trip. The application demonstrates key React concepts such as state management, lifting state up, derived state, and state updates.

### Features

1. **Add Items to the List**:

   - Users can add items with a description and quantity.
   - Items are stored in the local state of the app.

2. **Delete Items from the List**:

   - Users can delete items from the list.

3. **Toggle Packed Status**:

   - Users can mark items as packed or unpacked.

4. **Sort Items**:

   - Users can sort items by input order, description, or packed status.

5. **Clear List**:
   - Users can clear the entire list at once.

### Sample Code

#### Adding Items to the List

When adding items to the list, we handle form submission and manage the state:

```jsx
function handleItems(item) {
  setItems((items) => [...items, item]);
}

function handleSubmit(e) {
  e.preventDefault();
  if (!description) return;

  const newItem = {
    id: Date.now(),
    description: description,
    quantity: quantity,
    packed: false,
  };

  handleItems(newItem);
  setDescription("");
  setQuantity(1);
}
```

#### Moving Up State

We lift the state up to the parent component to share it across multiple components:

```jsx
function App() {
  const [items, setItems] = useState([]);

  function handleItems(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <>
      <Logo />
      <Form onAddItems={handleItems} />
      <PackingList items={items} />
      <Stats />
    </>
  );
}
```

#### Deleting Items from the List

To delete items, we update the state by filtering out the deleted item:

```jsx
function handleDeleteItem(id) {
  setItems((items) => items.filter((item) => item.id !== id));
}
```

#### Adding a Checkbox

We add a checkbox to mark items as packed or unpacked:

```jsx
function handleToggleItem(id) {
  setItems((items) =>
    items.map((item) =>
      item.id === id ? { ...item, packed: !item.packed } : item
    )
  );
}
```

#### Calculating Stats

We derive state to get the statistics of items:

```jsx
function Stats({ items }) {
  if (!items.length)
    return <p className="stats">Start Adding some items to the list 🚀</p>;
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything to go 🌟"
          : `You have ${numItems} items on your list and have packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
```

#### Sorting Items

Sorting items by different criteria:

```jsx
function PackingList({ items, onDeleteItem, onToggleItem }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            key={item.id}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by Packed Items</option>
        </select>
      </div>
    </div>
  );
}
```

#### Clearing the List

Clearing the entire list by resetting the state:

```jsx
function clearList() {
  setItems([]);
}
```

### Usage

Clone the repository and run the application using the following commands:

```bash
git clone https://github.com/your-username/packing-list-app.git
cd packing-list-app
npm install
npm start
```

This will start the application on `http://localhost:3000`.

Feel free to explore the code and modify it to suit your needs. Enjoy managing your packing list with React!

### License

This project is licensed under the MIT License.
