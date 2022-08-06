const formError = (form, message) => {
  for (let x = 0; x < form.children.length; x++) {
    console.log(form.children[x].getAttribute('error'))
    if (form.children[x].getAttribute('error') === 'active') {
      if (message === undefined) {
        form.children[x].innerText = ''
      } else {
        console.log(message)
        form.children[x].innerText = message
      }
    }
  }
}

export default formError