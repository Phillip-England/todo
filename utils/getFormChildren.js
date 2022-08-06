const getFormValues = (form) => {
  let inputs = []
  for (let x = 0; x < form.children.length; x++) {
    if (form.children[x].nodeName === 'INPUT') {
      inputs.push({
        name: form.children[x].getAttribute('name'),
        value: form.children[x].value,
      })
    }
  }
  return inputs
}

export default getFormValues