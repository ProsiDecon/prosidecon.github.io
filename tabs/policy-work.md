---
title: Policy Work
permalink: /policy-work/
intro: A collection of my policy-related work.
section_class: page-section--wide
---
<div class="collection-list">
  <article class="collection-card collection-card--muted">
    <p class="collection-card__label">Coming soon</p>
    <h2 class="collection-card__title">Policy publications and applied work</h2>
    <div class="collection-card__body">
      <p>Policy publications and applied work will be added here.</p>
      <p>When you are ready, duplicate `_policy/TEMPLATE.md` into a new file in the same folder and add the title, link, and summary.</p>
    </div>
  </article>

  {% assign policy_items = site.policy | sort: "path" %}
  {% for item in policy_items %}
    {% unless item.path contains "TEMPLATE.md" %}
      <article class="collection-card">
        <p class="collection-card__label">Policy work</p>
        <h2 class="collection-card__title">
          <a href="{{ item.external_url }}" target="_blank" rel="noopener noreferrer">
            {{ item.title }}
          </a>
        </h2>
        <div class="collection-card__body">
          {{ item.content | markdownify }}
        </div>
        <p class="collection-card__actions">
          <a class="button-link button-link--secondary" href="{{ item.external_url }}" target="_blank" rel="noopener noreferrer">Open piece</a>
        </p>
      </article>
    {% endunless %}
  {% endfor %}
</div>
