test('renders Bug Tracker header', () => {
  render(<App />)
  expect(screen.getByText(/bug tracker/i)).toBeInTheDocument()
})