// const useStore = create(
//   devtools((set) => ({
//     bears: 0,
//     increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//     removeAllBears: () => set({ bears: 0 })
//   }))
// );

// function BearCounter() {
//   const bears = useStore((state) => state.bears);
//   return <h1>{ bears } around here ...</h1>;
// }

// function Controls() {
//   const increasePopulation = useStore((state) => state.increasePopulation);
//   return <button onClick={ increasePopulation }>one up</button>;
// }
