---
title: Policy Work
permalink: /policy-work/
intro: A collection of my policy-related work and publications outside my main field of research.
section_class: page-section--wide
---
<div class="collection-list">
  {% assign policy_items = site.policy | sort: "order" %}
  {% for item in policy_items %}
    {% unless item.path contains "TEMPLATE.md" %}
      {% assign item_type = item.type | default: item["type"] | default: item.data.type | default: item.data["type"] | default: "Policy work" %}
      {% assign primary_url = item.external_url | default: item["external_url"] | default: item.data.external_url | default: item.data["external_url"] %}
      <article class="collection-card">
        <p class="collection-card__label">{{ item_type }}</p>
        <h2 class="collection-card__title">
          {% if primary_url and primary_url != "" %}
            <a href="{{ primary_url }}" target="_blank" rel="noopener noreferrer">
              {{ item.title }}
            </a>
          {% else %}
            {{ item.title }}
          {% endif %}
        </h2>
        {% assign collaborators_value = item.collaborators | default: item["collaborators"] | default: item.data.collaborators | default: item.data["collaborators"] %}
        {% if collaborators_value and collaborators_value != "" %}
          <p class="collection-card__meta">{{ collaborators_value }}</p>
        {% endif %}
        {% assign venue_value = item.venue | default: item["venue"] | default: item.data.venue | default: item.data["venue"] %}
        {% if venue_value and venue_value != "" %}
          <p class="collection-card__submeta">{{ venue_value }}</p>
        {% endif %}
        <div class="collection-card__body">
          {{ item.content | markdownify }}
        </div>
        {% assign links_value = item.links | default: item["links"] | default: item.data.links | default: item.data["links"] %}
        {% assign has_links = false %}
        {% capture policy_actions_markup %}
          {% if links_value %}
            {% for link in links_value %}
              {% assign link_label = link.label | default: link["label"] %}
              {% assign link_url = link.url | default: link["url"] %}
              {% if link_label and link_label != "" and link_url and link_url != "" %}
                {% assign has_links = true %}
                <a class="button-link button-link--secondary" href="{{ link_url }}" target="_blank" rel="noopener noreferrer">{{ link_label }}</a>
              {% endif %}
            {% endfor %}
          {% endif %}
          {% if has_links == false and primary_url and primary_url != "" %}
            <a class="button-link button-link--secondary" href="{{ primary_url }}" target="_blank" rel="noopener noreferrer">Open piece</a>
          {% endif %}
        {% endcapture %}
        {% assign policy_actions_markup = policy_actions_markup | strip %}
        {% if policy_actions_markup != "" %}
          <p class="collection-card__actions collection-card__actions--wrap">
            {{ policy_actions_markup }}
          </p>
        {% endif %}
      </article>
    {% endunless %}
  {% endfor %}
</div>
