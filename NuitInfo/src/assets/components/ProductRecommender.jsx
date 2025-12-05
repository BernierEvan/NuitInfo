import React from 'react';
import { useUser } from '../../context/UserContext';
import productsData from '../data/products.json';

const ProductRecommender = ({ productIds, isGlobal = false }) => {
  const { profile } = useUser();

  // Filtrer les produits
  let relevantProducts = [];

  if (isGlobal && profile) {
    // Mode global : recommander selon le profil complet
    relevantProducts = productsData.filter(p => {
      // Match par douleur
      if (profile.pain && p.forPains?.includes(profile.pain)) return true;
      // Match par objectif
      if (profile.goal && p.forGoals?.includes(profile.goal)) return true;
      // Match par ID si fourni
      if (productIds?.includes(p.id)) return true;
      return false;
    });
    // Limite à 4 produits maximum
    relevantProducts = relevantProducts.slice(0, 4);
  } else {
    // Mode exercice : filtrer par IDs
    relevantProducts = productsData.filter(p => productIds?.includes(p.id));
  }

  if (relevantProducts.length === 0) return null;

  return (
    <div className={`${isGlobal ? '' : 'mt-5 pt-4 border-t border-gray-100'}`}>
      {!isGlobal && (
        <h4 className="text-xs font-bold uppercase text-yellow-600 mb-3 tracking-wider flex items-center gap-2">
          <span className="bg-yellow-100 w-5 h-5 rounded flex items-center justify-center text-[10px]">🛒</span>
          Équipement Recommandé
        </h4>
      )}

      <div className={isGlobal ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4' : 'space-y-3'}>
        {relevantProducts.map(product => (
          <div
            key={product.id}
            className={`
              ${isGlobal
                ? 'bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-all group'
                : 'flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg group hover:from-blue-50 hover:to-blue-100 transition-colors'}
            `}
          >
            {isGlobal ? (
              // Mode Global (grille)
              <>
                <div className="mb-3">
                  <p className="font-bold text-white group-hover:text-yellow-300 transition-colors">
                    {product.name}
                  </p>
                  <p className="text-blue-200 text-sm mt-1 leading-snug">{product.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  {product.price && (
                    <span className="text-yellow-400 font-bold">{product.price}</span>
                  )}
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold text-xs px-4 py-2 rounded-lg transition-all transform hover:scale-105"
                  >
                    Voir →
                  </a>
                </div>
                {product.rating && (
                  <div className="flex items-center gap-1 mt-2 text-yellow-300 text-xs">
                    {'★'.repeat(Math.floor(product.rating))}
                    <span className="text-white/60 ml-1">{product.rating}</span>
                  </div>
                )}
              </>
            ) : (
              // Mode Exercice (liste)
              <>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm group-hover:text-blue-700 transition-colors truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{product.description}</p>
                  {product.price && (
                    <span className="text-green-600 font-bold text-xs">{product.price}</span>
                  )}
                </div>
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 flex-shrink-0 text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all font-medium"
                >
                  Voir ↗
                </a>
              </>
            )}
          </div>
        ))}
      </div>

      {isGlobal && (
        <p className="text-center text-blue-200/60 text-xs mt-4">
          💡 Produits sélectionnés selon ton profil et tes exercices recommandés
        </p>
      )}
    </div>
  );
};

export default ProductRecommender;