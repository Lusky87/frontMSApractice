<template>
  <div>
    React Button
  </div>
</template>
<script>
import { ref, onMounted, onBeforeUnmount, onUpdated } from 'vue';
import ReactDOM from 'react-dom';
import React from 'react';
// import Button from 'app2/Button';
const firstLoad = new Promise(resolve => setTimeout(resolve, 1000));
// const RemoteButton = React.lazy(() => import('home/Button'));
// const RemoteButton = React.lazy(() => import('remote_react/FileCards'));
async function fetchButton() {
  // simulate long network delay
  // await firstLoad;

  // uncomment to simulate failed load
  // throw new Error("Failed to load button from remote.");
  // return (await import('home/Button')).default;
  // return (await import('app2/Button')).default;
  // return (await import('remote_react/ReactApp')).default;
}

export default {
  name: 'FileReact',
  props: {
    text: String,
    onClick: Function,
  },
  
  setup(props) {
    // const ref = useRef(null);

    // useEffect(() => {
    //     mount(ref.current)
    // }, [])

    // return <div ref={ref} />

    const root = ref(null);
    const error = ref(null);
    const ButtonComponent = ref(null);

    // function updateReactComponent() {
    //   if (!ButtonComponent.value || !!error.value) return;

    //   ReactDOM.render(React.createElement(ButtonComponent.value, props), root.value);
    // }

    // function unmountReactComponent() {
    //   root.value && ReactDOM.unmountComponentAtNode(root.value);
    // }
    
    // onMounted(updateReactComponent);
    // onUpdated(updateReactComponent);
    // onBeforeUnmount(unmountReactComponent);

    fetchButton()
      .then(b => {
        ButtonComponent.value = b;
        updateReactComponent();
      })
      .catch(e => {
        error.value = e;
      });

    // return <RemoteButton />
    return { root, error };
  }
};
</script>