# Internal linking map

- Global header/footer: home, canonical generator, guide hub, About, Privacy, Terms and Contact; no redirect-source links.
- Home → primary generator and guide navigation/trust footer.
- Generator → troubleshooting and print-size guides; home navigation.
- Hub → each published guide. Each guide → home/hub breadcrumbs, generator CTA and two related guides.
- Every sitemap page is reachable globally or through the guide hub/cluster. Legacy trust pages should later adopt the shared header/footer.

## Phase 2 tool cluster

- Home → all five tools through the focused “Choose a focused QR tool” section.
- `/generator` → all five tools after the shared generator workflow.
- `/blog` → all five tools as a natural next action from the guide hub.
- Each specialized page → `/generator`, two related specialized tools and the scanning troubleshooting guide.
- Breadcrumbs link each specialized page to Home and `/generator`; all links are ordinary server-rendered anchors.
