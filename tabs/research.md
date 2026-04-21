---
title: Research
permalink: /research/
intro: Working papers and current research projects.
section_class: page-section--wide
---
<div class="collection-list">
  {% assign papers = site.research | sort: "order" %}
  {% for paper in papers %}
    {% unless paper.path contains "TEMPLATE.md" %}
      {% assign paper_type = paper.type | default: paper["type"] | default: paper.data.type | default: paper.data["type"] | default: "Working paper" %}
      {% assign pdf_path_value = paper.pdf_path | default: paper["pdf_path"] | default: paper.data.pdf_path | default: paper.data["pdf_path"] %}
      {% assign is_request_only = false %}
      {% if pdf_path_value == "request" %}
        {% assign is_request_only = true %}
      {% endif %}
      <article class="collection-card">
        <p class="collection-card__label">{{ paper_type }}</p>
        <h2 class="collection-card__title">
          {% if pdf_path_value and pdf_path_value != "" and is_request_only == false %}
            <a href="{{ pdf_path_value | relative_url }}" download>
              {{ paper.title }}
            </a>
          {% else %}
            {{ paper.title }}
          {% endif %}
        </h2>
        {% assign coauthors_value = paper.coauthors | default: paper["coauthors"] | default: paper.data.coauthors | default: paper.data["coauthors"] %}
        {% if coauthors_value and coauthors_value != "" %}
          <p class="collection-card__meta">{{ coauthors_value }}</p>
        {% endif %}
        <div class="collection-card__body">
          {{ paper.content | markdownify }}
        </div>
        {% assign links_value = paper.links | default: paper["links"] | default: paper.data.links | default: paper.data["links"] %}
        {% assign has_links = false %}
        {% capture research_actions_markup %}
          {% if links_value %}
            {% for link in links_value %}
              {% assign link_label = link.label | default: link["label"] %}
              {% assign link_url = link.url | default: link["url"] %}
              {% if link_label and link_label != "" and link_url and link_url != "" %}
                {% assign has_links = true %}
                <a class="button-link" href="{{ link_url }}" target="_blank" rel="noopener noreferrer">{{ link_label }}</a>
              {% endif %}
            {% endfor %}
          {% endif %}
          {% if has_links == false and pdf_path_value and pdf_path_value != "" and is_request_only == false %}
            <a class="button-link" href="{{ pdf_path_value | relative_url }}" download>Download PDF</a>
          {% elsif has_links == false and is_request_only %}
            <span class="collection-card__availability">Available upon request</span>
          {% endif %}
        {% endcapture %}
        {% assign research_actions_markup = research_actions_markup | strip %}
        {% if research_actions_markup != "" %}
          <p class="collection-card__actions collection-card__actions--wrap">
            {{ research_actions_markup }}
          </p>
        {% endif %}
      </article>
    {% endunless %}
  {% endfor %}
</div>
