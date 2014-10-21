/*! ***************************************************************************
 *
 * evolutility :: many-badges.js
 *
 * View many badges
 *
 * https://github.com/evoluteur/evolutility
 * Copyright (c) 2014, Olivier Giulieri
 *
 *************************************************************************** */

Evol.ViewMany.Badges = Evol.ViewMany.extend({

    viewName: 'badges',

    _render: function (models) {
        var h = [],
            pSize = this.pageSize || 50,
            pSummary = this.pageSummary(0, pSize, models.length);

        h.push('<div class="evol-many-badges"><div class="evol-badges-body">');
        this._HTMLbody(h, this.getFields(), pSize, this.uiModel.icon, 0, this.selectable);
        h.push('</div>', Evol.UI.html.clearer);
        this._HTMLpagination(h, 0, pSize, models.length);
        h.push('<div class="evo-many-summary">', pSummary, '</div>');
        h.push('</div>');
        this.$el.html(h.join(''));
        return this;
    },

    _$body: function(){
        return this.$('.evol-badges-body');
    },

    HTMLItem: function(h, fields, model, icon, selectable, route){
        var that = this,
            v,
            ft=Evol.Dico.fieldTypes,
            link = (this.links!==false);

        h.push('<div class="panel ',this.style,'">');
        _.each(fields, function(f, idx){
            if(f.value){
                v = f.value(model);
            }else if(f.type===ft.color) {
                v = model.escape(f.attribute || f.id);
                v = Evol.UI.input.colorBox(f.id, v, v);
            }else{
                v = that._HTMLField(f, model.escape(f.attribute || f.id));
            }
            if (idx === 0) {
                h.push('<div data-mid="', model.id, '"><h4>',
                    selectable?that._HTMLCheckbox(model.id):'',
                    Evol.Dico.HTMLFieldLink('fg-'+f.id, f, v, icon, !link, route?route+model.id:null),
                    '</h4></div>');
            }else{
                h.push('<div><label>', f.labelbadges?f.labelbadges:f.label,':</label> ', v, '</div>');
            }
        });
        h.push('</div>');
    }/*,

    customize: function () {
        var labels = this.$('h4 > a.evol-nav-id');
        if(this._custOn){
            labels.find('i').remove();
            this._custOn=false;
        }else{
            labels.append(Evol.UI.iconCustomize('id','field'));
            this._custOn=true;
        }
        return this;
    }*/

});

