import { injectGlobal } from 'styled-components'
import normalize from 'styled-normalize'

export default () =>

  injectGlobal`

    ${ normalize }

    body {
      font-family: -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Helvetica,
        Arial,sans-serif,
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol";
    }

    a {
      color: #000;
      text-decoration: none;
    }

    a, button {
      transition: .25s linear border-color;
      &:hover {
        border: 1px solid #4093c6;
      }
    }

  `