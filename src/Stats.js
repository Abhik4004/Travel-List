export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start Adding some items to the list 🚀</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length; //those whose packed items is true
  const percentage = Math.round(numPacked / numItems) * 100;
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything to go 🌟"
          : `🎒 You have ${numItems} items on your list and you have already packed
          ${numPacked} ${percentage}%`}
      </em>
    </footer>
  );
}
