import * as React from "react"
import { RawScript } from "./RawScript"

type Props = {
    analyticsId: string
}

export const GoogleTag = ({ analyticsId }: Props) => (
    <RawScript>
        {`(function (i, s, o, g, r, a, m) {
    if (!window.location.hostname.endsWith('framer.com')) return
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    },
    i[r].l = 1 * new Date();
    a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m
      .parentNode
      .insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

  ga('create', '${analyticsId}', 'auto', {allowLinker: true});`}
    </RawScript>
)
