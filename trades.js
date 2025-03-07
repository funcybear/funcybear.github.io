let trades = [];

        function addTrade() {
            const tradeIndex = trades.length;
            trades.push({ item: "", customItem: "", cost: "", customCost: "", amount: 1, price: 1, enchantment: "", level: 1 });

            let tradeDiv = document.createElement("div");
            tradeDiv.classList.add("trade-container");
            tradeDiv.id = `trade-container-${tradeIndex}`;
            tradeDiv.innerHTML = `
                <div class="trade-item">
                    <label>Item:
                        <select onchange="updateTrade(${tradeIndex}, 'item', this.value); toggleCustomItem(${tradeIndex})">
                            <option value="">Select Item</option>
                            <option value="CUSTOM">Custom Item</option>
                            <option value="ENCHANTED_BOOK">Enchanted Book</option>
                            <option value="DIAMOND">Diamond</option>
                            <option value="GOLDEN_APPLE">Golden Apple</option>
                            <option value="IRON_SWORD">Iron Sword</option>
                        </select>
                    </label>
                    <input type="text" id="custom-item-${tradeIndex}" placeholder="minecraft:item_id" style="display:none;" onchange="updateTrade(${tradeIndex}, 'customItem', this.value)">
                </div>
                <div class="trade-item" id="enchantment-container-${tradeIndex}" style="display: none;">
                    <label>Enchantment:
                        <select onchange="updateTrade(${tradeIndex}, 'enchantment', this.value)">
                            <option value="AQUA_AFFINITY">Aqua Affinity</option>
                            <option value="BANE_OF_ARTHROPODS">Bane of Arthropods</option>
                            <option value="BLAST_PROTECTION">Blast Protection</option>
                            <option value="CHANNELING">Channeling</option>
                            <option value="CURSE_OF_BINDING">Curse of Binding</option>
                            <option value="CURSE_OF_VANISHING">Curse of Vanishing</option>
                            <option value="DEPTH_STRIDER">Depth Strider</option>
                            <option value="EFFICIENCY">Efficiency</option>
                            <option value="FIRE_PROTECTION">Fire Protection</option>
                            <option value="FLAME">Flame</option>
                            <option value="FORTUNE">Fortune</option>
                            <option value="FROST_WALKER">Frost Walker</option>
                            <option value="IMPACT">Impact</option>
                            <option value="INFINITY">Infinity</option>
                            <option value="KNOCKBACK">Knockback</option>
                            <option value="LOOTING">Looting</option>
                            <option value="LOYALTY">Loyalty</option>
                            <option value="MENDING">Mending</option>
                            <option value="MULTISHOT">Multishot</option>
                            <option value="PIERCING">Piercing</option>
                            <option value="POWER">Power</option>
                            <option value="PROJECTILE_PROTECTION">Projectile Protection</option>
                            <option value="PROTECTION">Protection</option>
                            <option value="PUNCH">Punch</option>
                            <option value="QUICK_CHARGE">Quick Charge</option>
                            <option value="RESPIRATION">Respiration</option>
                            <option value="RIPTIDE">Riptide</option>
                            <option value="SHARPNESS">Sharpness</option>
                            <option value="SILK_TOUCH">Silk Touch</option>
                            <option value="SMITE">Smite</option>
                            <option value="SOUL_SPEED">Soul Speed</option>
                            <option value="SWEEPING_EDGE">Sweeping Edge</option>
                            <option value="THORNS">Thorns</option>
                            <option value="UNBREAKING">Unbreaking</option>
                        </select>
                    </label>
                </div>

                <div class="trade-item" id="level-container-${tradeIndex}" style="display: none;">
                    <label>Level: <input type="number" min="1" max="5" value="1" onchange="updateTrade(${tradeIndex}, 'level', this.value)"></label>
                </div>
                <div class="trade-item">
                    <label>Cost:
                        <select onchange="updateTrade(${tradeIndex}, 'cost', this.value); toggleCustomCost(${tradeIndex})">
                            <option value="">Select Cost</option>
                            <option value="CUSTOM">Custom Cost</option>
                            <option value="EMERALD">Emerald</option>
                            <option value="DIAMOND">Diamond</option>
                            <option value="GOLD_INGOT">Gold Ingot</option>
                        </select>
                    </label>
                    <input type="text" id="custom-cost-${tradeIndex}" placeholder="minecraft:item_id" style="display:none;" onchange="updateTrade(${tradeIndex}, 'customCost', this.value)">
                </div>
                <div class="trade-item">
                    <label>Amount: <input type="number" min="1" value="1" onchange="updateTrade(${tradeIndex}, 'amount', this.value)"></label>
                </div>
                <div class="trade-item">
                    <label>Price: <input type="number" min="1" value="1" onchange="updateTrade(${tradeIndex}, 'price', this.value)"></label>
                </div>
                <div class="trade-item">
                    <button onclick="removeTrade(${tradeIndex})">❌ Remove</button>
                </div>
            `;
            document.getElementById("trades").appendChild(tradeDiv);
        }

        function updateTrade(index, key, value) {
            if (key === "amount" || key === "price" || key === "level") {
                value = parseInt(value);
            }
            trades[index][key] = value;

            const enchantmentContainer = document.getElementById(`enchantment-container-${index}`);
            const levelContainer = document.getElementById(`level-container-${index}`);
            if (trades[index].item === "ENCHANTED_BOOK") {
                enchantmentContainer.style.display = "inline-block";
                levelContainer.style.display = "inline-block";
            } else {
                enchantmentContainer.style.display = "none";
                levelContainer.style.display = "none";
            }
        }

        function toggleCustomItem(index) {
            const customItemField = document.getElementById(`custom-item-${index}`);
            customItemField.style.display = trades[index].item === "CUSTOM" ? "inline-block" : "none";
        }

        function toggleCustomCost(index) {
            const customCostField = document.getElementById(`custom-cost-${index}`);
            customCostField.style.display = trades[index].cost === "CUSTOM" ? "inline-block" : "none";
        }

        function removeTrade(index) {
            trades.splice(index, 1);
            document.getElementById("trades").innerHTML = "";
            trades.forEach((_, i) => addTrade());
        }

        function generateConfig() {
            let yaml = "wandering_trader_trades:\n";
            trades.forEach(trade => {
                let itemID = trade.item === "CUSTOM" ? trade.customItem : trade.item;
                let costID = trade.cost === "CUSTOM" ? trade.customCost : trade.cost;

                yaml += `  - item: "${itemID}"\n`;
                if (trade.item === "ENCHANTED_BOOK" && trade.enchantment) {
                    yaml += `    enchantment: "${trade.enchantment}"\n`;
                    yaml += `    level: ${trade.level}\n`;
                }
                yaml += `    cost: "${costID}"\n`;
                yaml += `    amount: ${trade.amount}\n`;
                yaml += `    price: ${trade.price}\n`;
            });

            const minTrades = document.getElementById("min-trades").value;
            const maxTrades = document.getElementById("max-trades").value;

            yaml += `\nmin_trades_displayed: ${minTrades}\n`;
            yaml += `max_trades_displayed: ${maxTrades}\n`;

            document.getElementById("configOutput").value = yaml;
        }

        function copyConfig() {
            const configText = document.getElementById("configOutput");
            configText.select();
            document.execCommand("copy");

            alert("Config copied to clipboard!");
        }